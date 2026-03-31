"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Briefcase, 
  Code2, 
  Wrench, 
  Award, 
  BookOpen, 
  Mail 
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Experience", path: "#experience", icon: Briefcase },
  { name: "Projects", path: "#projects", icon: Code2 },
  { name: "Skills", path: "#skills", icon: Wrench },
  { name: "Certifications", path: "#certifications", icon: Award },
  { name: "Education", path:"#education", icon: BookOpen },
  { name: "Contact", path: "#contact", icon: Mail },
];

function DockIcon({ item, isActive, isScrolled }: { item: any, isActive: boolean, isScrolled: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <Link
      href={item.path}
      className="relative flex flex-col items-center justify-center outline-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.25, y: 4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 ${
          isActive ? "bg-white/10 border-[#00E5FF]/30" : "hover:bg-white/15 hover:border-white/20"
        } ${isScrolled ? "w-9 h-9 sm:w-10 sm:h-10" : "w-11 h-11 sm:w-12 sm:h-12"}`}
      >
        <Icon 
          className={`transition-colors ${
            isActive ? "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]" : "text-white/60 group-hover:text-white"
          } ${isScrolled ? "w-4 h-4" : "w-5 h-5 sm:w-6 sm:h-6"}`} 
        />
        {isActive && (
          <motion.div
            layoutId="activeDockDot"
            className="absolute -bottom-2 w-1 h-1 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 8 : -10, 
          scale: isHovered ? 1 : 0.8 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute w-max top-full mt-1 px-3 py-1.5 bg-[#0A0F17]/95 border border-white/10 text-white text-[11px] font-bold tracking-wide rounded-lg shadow-xl pointer-events-none z-50 flex items-center justify-center"
      >
        {item.name}
      </motion.div>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle shrunk state
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

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
          const distance = Math.abs(rect.top - window.innerHeight / 3);
          
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            if (distance < minDistance) {
              minDistance = distance;
              currentHash = `#${section}`;
            }
          }
        }
      });

      if (currentHash) {
        setActiveHash(currentHash);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger check immediately to set initial state
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-max"
    >
      <motion.div 
        animate={{
          backgroundColor: isScrolled ? "rgba(10, 15, 23, 0.4)" : "rgba(10, 15, 23, 0.85)",
        }}
        transition={{ duration: 0.3 }}
        className={`flex items-center transition-all duration-300 rounded-[2rem] backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative pointer-events-auto ${
          isScrolled ? "gap-1.5 sm:gap-2 px-2 py-2" : "gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3"
        }`}
      >
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-transparent via-[#00E5FF]/5 to-transparent pointer-events-none"></div>
        {navItems.map((item) => {
          const isActive = activeHash ? activeHash === item.path : pathname === item.path;
          return (
            <DockIcon key={item.name} item={item} isActive={isActive} isScrolled={isScrolled} />
          );
        })}
      </motion.div>
    </motion.nav>
  );
}
