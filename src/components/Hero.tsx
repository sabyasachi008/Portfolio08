"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Terminal, Activity, Database, Server, Cloud, FileText } from "lucide-react";
import Link from "next/link";

const stats = [
  { 
    value: "40%", 
    label: "Latency Reduction", 
    detail: "via gRPC & WebSockets",
    icon: <Activity className="w-5 h-5 text-[#00E5FF]" />
  },
  { 
    value: "300K+", 
    label: "Records Processed", 
    detail: "Daily via PySpark & AWS Glue",
    icon: <Database className="w-5 h-5 text-[#FF9900]" />
  },
  { 
    value: "99.9%", 
    label: "System Uptime", 
    detail: "High Availability Architecture",
    icon: <Server className="w-5 h-5 text-emerald-400" />
  },
  { 
    value: "10+", 
    label: "Cloud Deployments", 
    detail: "AWS, Vercel & Containerized",
    icon: <Cloud className="w-5 h-5 text-purple-400" />
  },
];

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden w-full pt-20 pb-12"
    >
      {/* Ambient glow backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none bg-[radial-gradient(circle,#00E5FF_0%,transparent_70%)]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] pointer-events-none bg-[radial-gradient(circle,#FF9900_0%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-[150px] pointer-events-none bg-[radial-gradient(circle,#ffffff_0%,transparent_50%)]" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="section-container w-full max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center px-6"
      >
        {/* Status badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2.5 glass border border-[#00E5FF]/20 rounded-full px-4 py-2 mb-8 bg-[#0A0F17]/80 backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.1)]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs tracking-widest uppercase font-mono text-white/80 font-semibold">
            Available for new opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-6 text-white drop-shadow-2xl"
          style={{ lineHeight: 1.1 }}
        >
          Sabyasachi{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#00b8d4] to-[#FF9900]">
            Ghosh
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          variants={itemVariants}
          className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center w-full font-light text-white/80"
        >
          <span className="flex items-center gap-2 font-medium text-white">
            <Terminal className="w-5 h-5 text-[#00E5FF]" />
            Software Engineer
          </span>
          <span className="hidden md:inline text-white/30">|</span>
          <span>Full Stack Development & Cloud Architecture</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-sm md:text-base max-w-2xl mx-auto text-center font-mono text-white/50 tracking-wide leading-relaxed"
        >
          Architecting scalable user interfaces & engineering highly available backend systems for massive throughput.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-[#00E5FF] text-[#0A0F17] overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,229,255,0.3)] w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative flex items-center gap-2">View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
          </a>
          
          <div className="flex w-full sm:w-auto gap-4 md:gap-6">
            <Link
              href="/resume"
              className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold glass border border-[#FF9900]/30 text-white hover:bg-[#FF9900]/10 hover:border-[#FF9900]/50 transition-all hover:scale-105 backdrop-blur-md shadow-[0_0_15px_rgba(255,153,0,0.1)]"
            >
              <FileText size={18} className="text-[#FF9900] group-hover:scale-110 transition-transform" /> Resume
            </Link>
            
            <a
              href="#contact"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold glass border border-white/10 text-white hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-md"
            >
              Contact
            </a>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto w-full"
        >
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="glass relative overflow-hidden bg-[#0A0F17]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 text-left hover:border-white/10 transition-colors group hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="mb-4 p-3 rounded-xl bg-black/40 inline-flex border border-white/5">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white/80 mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider">
                {stat.detail}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/30 hidden md:block">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
