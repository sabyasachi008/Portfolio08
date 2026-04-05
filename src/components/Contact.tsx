"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Github, Linkedin, Mail, MessageSquare, Send, User } from "lucide-react";
import SpatialWrapper from "./SpatialWrapper";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sabyasachighosh008@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        if (submitStatus !== "error") setSubmitStatus("idle");
      }, 3000);
    }
  };

  return (
    <section id="contact" className="w-full relative py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold font-sans text-white mb-2 flex items-center justify-center">
          Contact
        </h2>
        <p className="text-white/60">Let's build something amazing together</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-6xl mx-auto">
        {/* Left Form Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h-full"
        >
          <SpatialWrapper>
            <div className="h-full rounded-[2rem] p-8 flex flex-col bg-[#0A0F17]/60 backdrop-blur-md border border-white/10 relative overflow-hidden">
              {/* Traffic Lights */}
              <div className="flex gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-white/50 tracking-wider flex items-center gap-2 uppercase">
                    <User size={12} /> Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/50 transition-all font-sans"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-white/50 tracking-wider flex items-center gap-2 uppercase">
                    <Mail size={12} /> Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/50 transition-all font-sans"
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-xs font-semibold text-white/50 tracking-wider flex items-center gap-2 uppercase">
                    <MessageSquare size={12} /> Message
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/50 transition-all shrink-0 min-h-[120px] font-sans resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full py-4 rounded-xl bg-transparent border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-all outline-none disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />
                  ) : submitStatus === "success" ? (
                    <span className="text-green-400">Message Sent!</span>
                  ) : submitStatus === "error" ? (
                    <span className="text-red-400">Failed to send, try again</span>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </SpatialWrapper>
        </motion.div>

        {/* Right Info Panels */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <SpatialWrapper>
              <div className="h-full rounded-[2rem] p-8 flex flex-col bg-[#0A0F17]/60 backdrop-blur-md border border-white/10 relative overflow-hidden">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                <h3 className="text-white/90 font-medium mb-6">Quick Connect</h3>

                <div className="flex flex-col gap-4">
                  <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between group hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-white/5 text-white/50 group-hover:text-white transition-colors">
                        <Mail size={16} />
                      </div>
                      <span className="text-white/70 font-mono text-sm group-hover:text-white transition-colors">
                        sabyasachighosh008@gmail.com
                      </span>
                    </div>
                    <button 
                      onClick={handleCopyEmail}
                      type="button"
                      className="p-2 text-white/30 hover:text-white transition-colors"
                      title="Copy email"
                    >
                      {copied ? <span className="text-xs text-green-400">Copied!</span> : <Copy size={14} />}
                    </button>
                  </div>

                  <a 
                    href="https://www.linkedin.com/in/sabyasachig008/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-4 group hover:bg-white/10 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-white/5 text-white/50 group-hover:text-white transition-colors">
                      <Linkedin size={16} />
                    </div>
                    <span className="text-white/70 font-mono text-sm group-hover:text-white transition-colors">
                      linkedin.com/in/sabyasachig008
                    </span>
                  </a>

                  <a 
                    href="https://github.com/sabyasachi008" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-4 group hover:bg-white/10 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-white/5 text-white/50 group-hover:text-white transition-colors">
                      <Github size={16} />
                    </div>
                    <span className="text-white/70 font-mono text-sm group-hover:text-white transition-colors">
                      github.com/sabyasachi008
                    </span>
                  </a>
                </div>
              </div>
            </SpatialWrapper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SpatialWrapper>
              <div className="rounded-[2rem] p-8 flex flex-col items-center justify-center text-center bg-[#0A0F17]/60 backdrop-blur-md border border-white/10 relative overflow-hidden min-h-[160px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-white/50"></div>
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                    Status
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">
                  Open to Roles
                </h4>
                <p className="text-sm text-white/40">
                  Remote-friendly
                </p>
              </div>
            </SpatialWrapper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
