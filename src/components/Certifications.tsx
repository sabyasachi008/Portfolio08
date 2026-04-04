"use client";
import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import SpatialWrapper from "./SpatialWrapper";

const certifications = [
  {
    title: "AWS Certified Data Engineer Associate",
    issuer: "Amazon Web Services",
    date: "2025",
    color: "#FF9900",
    icon: "☁️"
  },
  {
    title: "DataBricks Data Engineering Associate",
    issuer: "DataBricks",
    date: "2026",
    color: "#326CE5",
    icon: "☸️"
  },
  {
    title: "MongoDB Certified Developer",
    issuer: "MongoDB",
    date: "2026",
    color: "#13AA52",
    icon: "🍃"
  },
  {
    title: "GitHub Copilot GC-300",
    issuer: "GitHub",
    date: "2026",
    color: "#13AA52",
    icon: "🤖"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="w-full relative flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
          <Award className="w-8 h-8 text-[#00E5FF]" />
          Certifications
        </h2>
        <p className="text-white/60">Professional credentials and validated expertise.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="h-full"
          >
            <SpatialWrapper glowColor={`${cert.color}40`} className="h-full">
              <div 
                className="h-full glass rounded-3xl p-6 flex flex-col bg-[#0A0F17]/60 backdrop-blur-md border border-white/5 transition-all group relative overflow-hidden"
              >
                {/* Background Hue */}
                <div 
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                  style={{ backgroundColor: cert.color }}
                />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="text-3xl drop-shadow-lg">{cert.icon}</div>
                  <a href="#" className="p-2 bg-white/5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors pointer-events-auto">
                    <ExternalLink size={14} />
                  </a>
                </div>
                
                <div className="mt-auto flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-white shadow-sm leading-snug">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-xs font-semibold text-white/60 tracking-wide">{cert.issuer}</span>
                    <span className="text-xs font-mono px-2 py-1 rounded border border-white/10 bg-black/40 text-[#00E5FF] shadow-inner">{cert.date}</span>
                  </div>
                </div>
              </div>
            </SpatialWrapper>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
