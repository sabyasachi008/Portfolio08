"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Experience", path: "#experience" },
  { name: "Projects", path: "#projects" },
  { name: "Skills", path: "#skills" },
  { name: "Certifications", path: "#certifications" },
  { name: "Education", path:"#education"},
  { name: "Contact", path: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // If at the very top, highlight Home
      if (window.scrollY < 100) {
        setActiveHash("/");
        return;
      }

      const sections = navItems
        .filter(item => item.path.startsWith("#"))
        .map(item => item.path.substring(1));

      let currentHash = "";
      let minDistance = Infinity;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Distance from the top third of the viewport
          const distance = Math.abs(rect.top - window.innerHeight / 3);
          
          // If the element's top is above the middle of screen, and its bottom is visible
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            if (distance < minDistance) {
              minDistance = distance;
              currentHash = `#${section}`;
            }
          }
        }
      });

      // Update if we found a valid section in bounds
      if (currentHash) {
        setActiveHash(currentHash);
      }
    };

    // Attach listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger check immediately to set initial state
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-[90%] md:w-auto"
    >
      <div className="rounded-2xl md:rounded-full px-5 md:px-7 py-3.5 flex items-center justify-center gap-3 md:gap-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-[#0A0F17]/85 backdrop-blur-xl border border-white/10 flex-wrap">
        {navItems.map((item) => {
          // If activeHash is determined by scroll, use it. Otherwise fallback to pathname matching.
          const isActive = activeHash ? activeHash === item.path : pathname === item.path;
          
          return (
            <Link
              key={item.name}
              href={item.path}
              target={item.name === "Resume" ? "_blank" : undefined}
              rel={item.name === "Resume" ? "noopener noreferrer" : undefined}
              className={`relative text-[11px] sm:text-xs md:text-sm font-bold tracking-wide transition-all duration-300 py-1 ${
                isActive 
                  ? "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.name}
              {isActive && item.name !== "Resume" && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
