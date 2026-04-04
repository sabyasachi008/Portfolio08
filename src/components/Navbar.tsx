"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Briefcase, 
  Code2, 
  Wrench, 
  Award, 
  BookOpen, 
  Mail,
  Menu,
  X
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

function DockIcon({ item, isActive, layoutIdPrefix }: { item: { name: string; path: string; icon: React.ComponentType<{ className?: string }> }, isActive: boolean, layoutIdPrefix: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;
  const isExpanded = isActive || isHovered;

  return (
    <Link
      href={item.path}
      className="relative flex flex-col items-center justify-center outline-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        layout
        whileHover={{ y: 0 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`flex flex-row items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden transition-colors duration-300 ${
          isActive ? "bg-white/10 border-[#00E5FF]/30" : "hover:bg-white/15 hover:border-white/20"
        } h-11 sm:h-12 ${isExpanded ? "px-4 gap-2" : "w-11 sm:w-12 px-0 gap-0"}`}
      >
        <motion.div layout className="flex items-center justify-center">
          <Icon 
            className={`transition-colors ${
              isActive ? "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]" : "text-white/60 group-hover:text-white"
            } w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0`} 
          />
        </motion.div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              layout
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: "auto", marginLeft: 4 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap ${
                isActive ? "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]" : "text-white group-hover:text-white"
              }`}
            >
              {item.name}
            </motion.span>
          )}
        </AnimatePresence>

        {isActive && (
          <motion.div
            layoutId={`${layoutIdPrefix}-activeDockDot`}
            className="absolute -bottom-2.5 w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
      </motion.div>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFabHovered, setIsFabHovered] = useState(false);

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
  }, [activeHash]);

  return (
    <>
      {/* Top Dock (Hero State) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] w-max"
          >
            <motion.div 
              className="flex items-center transition-all duration-300 rounded-[2rem] backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative pointer-events-auto gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-[#0A0F17]/85"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-transparent via-[#00E5FF]/5 to-transparent pointer-events-none"></div>
              {navItems.map((item) => {
                const isActive = activeHash ? activeHash === item.path : pathname === item.path;
                return (
                  <DockIcon key={item.name} item={item} isActive={isActive} layoutIdPrefix="top" />
                );
              })}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Scrolled State) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-auto"
            onMouseEnter={() => setIsFabHovered(true)}
            onMouseLeave={() => setIsFabHovered(false)}
          >
            <AnimatePresence>
              {isFabHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col items-end gap-2 p-2 rounded-[2rem] backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] bg-[#0A0F17]/85"
                >
                  {navItems.map((item) => {
                    const isActive = activeHash ? activeHash === item.path : pathname === item.path;
                    return (
                      <DockIcon key={item.name} item={item} isActive={isActive} layoutIdPrefix="fab" />
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#00E5FF] to-[#00b8d4] shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center text-[#0A0F17] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-shadow border-2 border-white/10"
            >
              {isFabHovered ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
