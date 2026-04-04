"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Server, ExternalLink, Github } from "lucide-react";
import SpatialWrapper from "./SpatialWrapper";

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  frontendView: {
    heading: string;
    points: string[];
    tech: string[];
  };
  backendView: {
    heading: string;
    diagram: string;
    points: string[];
    tech: string[];
  };
  accent: string;
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [view, setView] = useState<"frontend" | "backend">("frontend");
  
  const currentView = view === "frontend" ? project.frontendView : project.backendView;
  const glowColor = project.accent === "#FF9900" ? "rgba(255, 153, 0, 0.25)" : "rgba(0, 229, 255, 0.25)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="h-full"
    >
      <SpatialWrapper glowColor={glowColor} className="h-full flex flex-col">
        <div className="glass rounded-2xl overflow-hidden flex flex-col h-full bg-[#0A0F17]/80 backdrop-blur-md border border-white/10 p-6 shadow-2xl relative">
          
          {/* Subtle Accent Glow Ring */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 pointer-events-none" 
            style={{ backgroundColor: project.accent }} 
          />
          
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4 relative z-10">
            <div>
              <h3 className="text-xl font-bold mb-1 text-white">
                {project.title}
              </h3>
              <p className="text-sm font-mono tracking-wide" style={{ color: project.accent }}>
                {project.subtitle}
              </p>
            </div>
            <div className="flex gap-2">
              <a href="https://github.com/sabyasachi008" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          <p className="text-sm text-white/70 mb-6 leading-relaxed relative z-10">
            {project.description}
          </p>

          {/* Toggle */}
          <div className="flex bg-[#030508]/80 border border-white/5 rounded-lg p-1 mb-6 relative z-10">
            <button
              onClick={() => setView("frontend")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-all duration-300 ${
                view === "frontend"
                  ? "bg-[#00E5FF]/20 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Monitor size={14} /> Frontend
            </button>
            <button
              onClick={() => setView("backend")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-all duration-300 ${
                view === "backend"
                  ? "bg-[#FF9900]/20 text-[#FF9900] shadow-[0_0_15px_rgba(255,153,0,0.1)]"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Server size={14} /> Backend
            </button>
          </div>

          {/* View content */}
          <div className="flex-1 flex flex-col relative z-10 min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, x: view === "frontend" ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: view === "frontend" ? 10 : -10 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col h-full"
              >
                <h4
                  className="text-xs font-bold mb-4 uppercase tracking-widest"
                  style={{
                    color: view === "frontend" ? "#00E5FF" : "#FF9900",
                  }}
                >
                  {currentView.heading}
                </h4>

                {/* Architecture diagram for backend */}
                {view === "backend" && project.backendView.diagram && (
                  <pre
                    className="text-[9px] mb-5 p-4 rounded-xl overflow-x-auto leading-snug font-mono bg-gradient-to-br from-[#030508] to-[#0a0f17] border border-white/5 shadow-inner"
                    style={{ color: "rgba(255,153,0,0.85)" }}
                  >
                    {project.backendView.diagram}
                  </pre>
                )}

                <ul className="space-y-4 mb-8 flex-1">
                  {currentView.points.map((p, i) => (
                    <motion.li 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (i * 0.1) }}
                      key={`point-${p.substring(0, 10)}-${i}`} 
                      className="flex gap-3 text-sm text-white/75 leading-relaxed items-start"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{
                          background: view === "frontend" ? "#00E5FF" : "#FF9900",
                          boxShadow: `0 0 8px ${view === "frontend" ? "#00E5FF" : "#FF9900"}`
                        }}
                      />
                      <span>{p}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {currentView.tech.map((t, i) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (i * 0.05) }}
                      key={t}
                      className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 rounded-md backdrop-blur-sm"
                      style={{
                        color: view === "frontend" ? "#00E5FF" : "#FF9900",
                        background: view === "frontend" ? "rgba(0,229,255,0.05)" : "rgba(255,153,0,0.05)",
                        border: `1px solid ${
                          view === "frontend" ? "rgba(0,229,255,0.15)" : "rgba(255,153,0,0.15)"
                        }`,
                      }}
                    >
                      {t}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SpatialWrapper>
    </motion.div>
  );
}
