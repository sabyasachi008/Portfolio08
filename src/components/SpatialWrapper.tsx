"use client";
import React, { useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

interface SpatialWrapperProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g., "rgba(0, 229, 255, 0.15)" or "rgba(255, 153, 0, 0.15)"
}

export default function SpatialWrapper({ children, className = "", glowColor = "rgba(0, 229, 255, 0.15)" }: SpatialWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  // Rotate towards mouse. Range is smaller for a subtle effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates from -0.5 to 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: `0 20px 40px -10px ${glowColor}` 
      }}
      className={`[perspective:1000px] w-full transition-shadow duration-300 rounded-3xl ${className}`}
    >
      <div 
        style={{ transform: "translateZ(40px)" }} 
        className="w-full h-full transform-gpu"
      >
        {children}
      </div>
    </motion.div>
  );
}
