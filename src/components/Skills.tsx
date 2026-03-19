"use client";
import React from "react";
import { motion } from "framer-motion";
import { Layers, Database, Code, Wrench } from "lucide-react";
import SpatialWrapper from "./SpatialWrapper";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code className="w-6 h-6 text-[#00E5FF]" />,
    skills: ["JavaScript", "React", "Next.js", "TypeScript", "TailwindCSS", "HTML/CSS"],
    gridClass: "md:col-span-2 lg:col-span-1"
  },
  {
    title: "Backend & APIs",
    icon: <Layers className="w-6 h-6 text-[#FF9900]" />,
    skills: ["Node.js", "Nest.js", "Express.js", "Java", "Spring Boot", "gRPC", "REST APIs", "Redis"],
    gridClass: "md:col-span-1 lg:col-span-1"
  },
  {
    title: "Cloud & Data",
    icon: <Database className="w-6 h-6 text-emerald-400" />,
    skills: ["AWS", "PySpark", "Apache Airflow", "SQL", "MongoDB"],
    gridClass: "md:col-span-3 lg:col-span-1"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="w-full relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
          <Wrench className="w-8 h-8 text-[#00E5FF]" />
          Technical Arsenal
        </h2>
        <p className="text-white/60">A Bento-box overview of my full-stack capabilities.</p>
      </motion.div>

      {/* Bento Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
        {skillCategories.map((cat, index) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cat.gridClass}
          >
            <SpatialWrapper glowColor="rgba(0, 229, 255, 0.15)" className="h-full">
              <div className="glass h-full rounded-3xl p-8 flex flex-col gap-6 bg-[#0A0F17]/60 backdrop-blur-md border border-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {cat.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-full text-xs font-medium text-white/80 hover:text-white hover:border-white/20 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SpatialWrapper>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
