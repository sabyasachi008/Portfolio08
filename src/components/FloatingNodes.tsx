"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingNodes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {/* Ambient background blur blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FF9900]/5 rounded-full blur-[120px] -z-10" />

      {/* Cyan Node */}
      <motion.div
        animate={{
          y: [-25, 25, -25],
          x: [-10, 10, -10],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-[15%] w-6 h-6 rounded-full bg-[#00E5FF]/30 blur-[2px] shadow-[0_0_20px_rgba(0,229,255,0.6)]"
      />
      
      {/* Orange Node */}
      <motion.div
        animate={{
          y: [30, -30, 30],
          x: [15, -15, 15],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/3 right-[15%] w-8 h-8 rounded-full bg-[#FF9900]/30 blur-[2px] shadow-[0_0_25px_rgba(255,153,0,0.6)]"
      />

      {/* Tiny Data Dots */}
      <motion.div
        animate={{
          y: [-15, 15, -15],
          x: [-10, 10, -10],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-[30%] w-1.5 h-1.5 rounded-full bg-[#00E5FF]/80 shadow-[0_0_5px_#00E5FF]"
      />
      
      <motion.div
        animate={{
          y: [15, -15, 15],
          x: [10, -10, 10],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[40%] w-2 h-2 rounded-full bg-[#FF9900]/80 shadow-[0_0_5px_#FF9900]"
      />
      
      <motion.div
        animate={{
          y: [-20, 20, -20],
          x: [20, -20, 20],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[45%] w-1 h-1 rounded-full bg-[#00E5FF]/70 shadow-[0_0_5px_#00E5FF]"
      />
    </div>
  );
}
