"use client";
import React, { useState, useRef, useEffect } from "react";
import { Terminal, Copy, Check, Play } from "lucide-react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

function syntaxHighlight(json: string): string {
  if (!json) return "";
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^"\\])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let color = "#27C93F"; // string
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          color = "#00E5FF"; // key
        }
      } else if (/true|false/.test(match)) {
        color = "#FF5F56"; // boolean
      } else if (/-?\d+/.test(match)) {
        color = "#FFBD2E"; // number
      }
      return `<span style="color: ${color}">${match}</span>`;
    }
  );
}

const COMMAND = `fetch('/api/skills')`;

export default function DeveloperTerminal() {
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const fetchSkills = async () => {
    setOutput(null);
    setLoading(true);
    setTyped("");
    setIsTyping(false);

    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      const formatted = JSON.stringify(data, null, 2);
      setOutput(formatted);
      setLoading(false);
      setIsTyping(true);
    } catch (err) {
      setOutput('{ "error": "Failed to fetch" }');
      setLoading(false);
      setIsTyping(true);
    }
  };

  // Typing animation
  useEffect(() => {
    if (!isTyping || !output) return;
    let i = 0;
    const speed = 6; // characters per frame
    const timer = setInterval(() => {
      i += speed;
      if (i >= output.length) {
        setTyped(output);
        setIsTyping(false);
        clearInterval(timer);
      } else {
        setTyped(output.slice(0, i));
      }
    }, 8);
    return () => clearInterval(timer);
  }, [isTyping, output]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [typed]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Zero-Gravity Spatial 3D Animation Hook
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0, 229, 255, 0.2)" }}
      className="w-full max-w-4xl mx-auto [perspective:1000px] mt-12 mb-10"
    >
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="w-full glass rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col border border-white/10 bg-[#0A0F17]/90 backdrop-blur-2xl"
      >
        {/* Terminal Header */}
        <div className="flex justify-between items-center bg-[#030508]/80 px-5 py-3.5 border-b border-white/5 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20 text-black flex items-center justify-center hover:bg-[#ff4e45] transition-colors"><span className="opacity-0 hover:opacity-100 text-[8px] leading-none mb-0.5 pointer-events-none">x</span></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20 text-black flex items-center justify-center hover:bg-[#ffb012] transition-colors"><span className="opacity-0 hover:opacity-100 text-[8px] leading-none mb-0.5 pointer-events-none">-</span></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20 text-black flex items-center justify-center hover:bg-[#1dba31] transition-colors"><span className="opacity-0 hover:opacity-100 text-[8px] leading-none mb-0.5 pointer-events-none">+</span></div>
            <span className="ml-4 text-[11px] text-white/50 font-mono flex items-center gap-1.5 tracking-wide">
              <Terminal className="w-3 h-3" />
              sabyasachi@portfolio:~
            </span>
          </div>
          <div className="flex gap-2">
            {output && (
              <button
                onClick={copyToClipboard}
                className="text-white/40 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
                title="Copy JSON"
                aria-label="Copy output"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#27C93F]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 md:p-6 bg-transparent font-mono text-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 overflow-x-auto text-sm px-1">
              <span className="text-[#00E5FF] font-semibold whitespace-nowrap">$</span>
              <span className="text-white/90 whitespace-nowrap tracking-wide">{COMMAND}</span>
            </div>
            <button
              onClick={fetchSkills}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:scale-[1.02] rounded-lg transition-all text-xs font-bold uppercase tracking-widest border border-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.1)]"
            >
              <Play className="w-3.5 h-3.5 fill-[#00E5FF]/40" />
              {loading ? "Executing..." : "Run Query"}
            </button>
          </div>

          {/* Console Output Area */}
          <div 
            ref={bodyRef}
            className="w-full min-h-[300px] max-h-[400px] overflow-y-auto rounded-xl bg-[#030508]/60 p-5 border border-white/5 shadow-inner [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {loading ? (
              <div className="flex items-center gap-3 text-white/50 text-xs">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="w-4 h-4 border-2 rounded-full border-t-transparent border-[#00E5FF]"
                />
                <span className="tracking-wide">Awaiting response from API...</span>
              </div>
            ) : typed ? (
              <div className="mt-1">
                <div className="text-[11px] mb-4 text-white/40 flex items-center gap-2 font-sans tracking-wide">
                  <span className="text-[#27C93F] font-bold text-sm">✓</span> 200 OK • application/json • {typed.length} bytes
                </div>
                <pre
                  className="whitespace-pre-wrap break-words text-[13px] md:text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlight(typed),
                  }}
                />
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="inline-block w-2.5 h-4 ml-1 align-middle bg-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.8)]"
                  />
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-xs min-h-[200px]">
                <Terminal className="w-10 h-10 mb-4" />
                <span className="font-semibold tracking-widest uppercase">Awaiting command execution</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
