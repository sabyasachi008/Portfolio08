"use client";
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center justify-center md:justify-start gap-3">
          <GraduationCap className="w-8 h-8 text-[#00E5FF]" />
          Education
        </h2>
        
        <div className="glass rounded-2xl p-6 md:p-10 border-l-4 border-l-[#00E5FF] hover:border-white/10 transition-colors group">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00E5FF] transition-colors">B.Tech in Computer Science & Engineering</h3>
              <div className="text-base md:text-lg text-[#FF9900] font-medium mt-1">Kalinga Institute of Industrial Technology</div>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <span className="bg-white/5 text-[var(--color-foreground)] px-4 py-1.5 rounded-full text-sm font-semibold border border-white/5">
                CGPA: 8.0
              </span>
              <span className="flex items-center gap-1 text-xs text-white/50">
                <MapPin className="w-3 h-3" />
                Odisha, India
              </span>
            </div>
          </div>
          <p className="text-white/70 leading-relaxed text-sm md:text-base">
            Focused on advanced data structures, cloud architectures, and full-stack development. 
            Participated in numerous hackathons and built scalable web applications using modern web technologies.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
