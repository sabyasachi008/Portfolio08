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
import Contact from "@/components/Contact";

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
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
