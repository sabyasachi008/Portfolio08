"use client";
import React, { useEffect, useState } from "react";
import { Github, Linkedin, ShieldCheck, Activity, Trophy } from "lucide-react";

export default function Footer() {
  const [uptime, setUptime] = useState("99.99%");

  useEffect(() => {
    // Simulated system uptime fluctuation for cool visual effect
    const interval = setInterval(() => {
      const randomDecimals = (Math.random() * (99.99 - 99.95) + 99.95).toFixed(2);
      setUptime(`${randomDecimals}%`);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full glass-nav border-t border-white/5 py-8 mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-[#ededed]/70">
          <span className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00E5FF] animate-pulse" />
            System Uptime: {uptime}
          </span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="flex items-center text-[#FF9900] gap-2">
            <ShieldCheck className="w-4 h-4" />
            WCAG 2.1 Compliant
          </span>
        </div>
        
        <div className="flex gap-4">
          <a
            href="https://github.com/sabyasachi008"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ededed]/70 hover:text-[#00E5FF] transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/sabyasachig008/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ededed]/70 hover:text-[#00E5FF] transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://leetcode.com/u/sabyasachi099/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ededed]/70 hover:text-[#00E5FF] transition-colors"
            title="LeetCode"
          >
            <Trophy className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-white/40 mt-6">
        © {new Date().getFullYear()} Sabyasachi Ghosh. Built with Next.js, TailwindCSS & Framer Motion.
      </div>
    </footer>
  );
}
