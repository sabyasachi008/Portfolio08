"use client";
import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function SpotlightGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Initialize to hide the spotlight initially
    mouseX.set(-1000);
    mouseY.set(-1000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-full w-full">
      {/* Background color block and subtle cyan hue around the cursor */}
      <motion.div
        className="absolute inset-0 bg-[#0A0F17]"
      />
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: useMotionTemplate`radial-gradient(circle 600px at ${mouseX}px ${mouseY}px, rgba(0, 229, 255, 0.4), transparent 80%)`,
        }}
      />
      
      {/* The actual grid, masked so it's only visible near the mouse */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: useMotionTemplate`radial-gradient(circle 400px at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(circle 400px at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}
