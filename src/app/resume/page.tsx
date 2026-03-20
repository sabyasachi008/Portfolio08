"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText } from "lucide-react";
import Link from "next/link";
import FloatingNodes from "@/components/FloatingNodes";
import Navbar from "@/components/Navbar";

export default function ResumePage() {
  // Use /preview for the iframe to embed google drive directly
  const resumeUrl = "https://drive.google.com/file/d/1hw-uuMbF-M0fRpoObt_HIeG-IFfDdngJ/preview";
  // Regular view link for clicking to open in a new tab
  const downloadUrl = "https://drive.google.com/file/d/1hw-uuMbF-M0fRpoObt_HIeG-IFfDdngJ/view?usp=sharing"; 

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden w-full relative">
      <FloatingNodes />
      <Navbar />

      <div className="w-full max-w-5xl mx-auto px-6 py-24 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        >
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/60 hover:text-white glass border border-white/5 hover:bg-white/10 transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold tracking-wide">Back to Portfolio</span>
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 tracking-tight">
            <FileText className="text-[#00E5FF] w-8 h-8" />
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00b8d4]">Resume</span>
          </h1>

          <a 
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF9900]/10 text-[#FF9900] hover:bg-[#FF9900]/20 border border-[#FF9900]/30 transition-all text-sm font-bold tracking-wide shadow-[0_0_15px_rgba(255,153,0,0.15)] hover:-translate-y-0.5"
          >
            <Download size={16} />
            Open in Drive
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full h-[75vh] min-h-[600px] glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#0A0F17]/80 backdrop-blur-xl group"
        >
          {/* Subtle Accent Glow Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[120px] opacity-10 pointer-events-none bg-[#00E5FF] rounded-full group-hover:opacity-20 transition-opacity duration-700" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] blur-[100px] opacity-10 pointer-events-none bg-[#FF9900] rounded-full" />
          
          {/* Iframe for Google Drive */}
          <iframe 
            src={resumeUrl} 
            className="w-full h-full relative z-10 rounded-3xl border-0"
            allow="autoplay"
            title="Sabyasachi Ghosh Resume"
          />
        </motion.div>
      </div>
    </main>
  );
}
