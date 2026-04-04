"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Software Engineer",
    company: "LTM",
    duration: "May 2025 - Present",
    description: "Spearheaded the resolution of critical API timeout issues by offloading heavy synchronous data-processing tasks to asynchronous background worker queues using Node.js and Redis. Eliminated main-thread blocking and reduced response times by over 70%. Migrated legacy Vanilla JS frontends/backends to strict TypeScript, improving team velocity and optimizing database queries by 40%.",
    tech: ["Node.js", "Redis", "TypeScript", "SQL", "AWS", "MS-SQL-Server", "Javascript"],
  },
  {
    role: "Graduate Engineer Trainee",
    company: "LTM",
    duration: "Feb 2025 - May 2025",
    description: "Built a robust 3-layer data processing pipeline handling heavy backend data infrastructure using PySpark, AWS Glue, and Amazon Redshift.",
    tech: ["PySpark", "AWS Glue", "Redshift", "Python", "QuickSight", "Github"],
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 relative w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center md:text-left"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
          <Briefcase className="w-8 h-8 text-[#FF9900]" />
          Experience
        </h2>
        <p className="text-white/60">Driving end-to-end impact in scalable environments.</p>
      </motion.div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px md:before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black absolute left-0 md:left-1/2 -translate-x-1/2 z-10 transition-colors group-hover:border-[#00E5FF]/50">
              <div className="w-3 h-3 bg-[#00E5FF] rounded-full shadow-[0_0_10px_#00E5FF]" />
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass rounded-2xl p-6 hover:border-[#00E5FF]/30 transition-colors ml-14 md:ml-0">
              <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors">{exp.role}</h3>
                  <div className="text-[#FF9900] font-medium">{exp.company}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full w-fit">
                  <Calendar className="w-3 h-3" />
                  {exp.duration}
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map(tech => (
                  <span key={tech} className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md bg-[#00E5FF]/10 text-[#00E5FF]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
