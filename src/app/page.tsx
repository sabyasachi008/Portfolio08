"use client";
import React from "react";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import DeveloperTerminal from "@/components/DeveloperTerminal";
import Footer from "@/components/Footer";
import FloatingNodes from "@/components/FloatingNodes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden w-full relative">
      <FloatingNodes />
      
      {/* 
        All sections are wrapped in this main container with consistent, 
        generous padding and gap structures so the UI Breathes.
      */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-24 px-6 md:px-12 py-24">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        
        <div className="w-full relative pt-12">
          <DeveloperTerminal />
        </div>

        <Certifications />
        <Education />
        
        {/* Contact Section */}
        <section id="contact" className="w-full text-center py-12 flex flex-col items-center justify-center gap-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Let&apos;s Build Something <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#FF9900]">
              Extraordinary
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
            I am currently exploring new opportunities inside scalable environments. 
            Whether you have a strategic question or just want to collaborate, 
            my inbox is always open. Let&apos;s engineer the future.
          </p>
          <a 
            href="mailto:sabyasachighosh008@gmail.com" 
            className="px-10 py-4 rounded-xl bg-[#FF9900] text-[#0A0F17] font-extrabold flex items-center justify-center gap-2 hover:bg-[#FF9900]/90 transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(255,153,0,0.3)] tracking-wide text-lg"
          >
            Get In Touch
          </a>
        </section>
      </div>

      <Footer />
    </main>
  );
}
