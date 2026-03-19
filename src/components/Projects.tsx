"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";
import ProjectCard, { Project } from "./ProjectCard";

const projectsData: Project[] = [
  {
    title: "Course Selling Application",
    subtitle: "End-to-End MERN Stack",
    description:
      "A full-stack course marketplace with seamless UI, robust auth, and payment workflows. Developed entirely with modern React and Node.js practices.",
    frontendView: {
      heading: "Frontend Architecture",
      points: [
        "React SPA with TypeScript for type-safe component architecture",
        "Protected routes with JWT-based auth state management",
        "Responsive course catalog with search, filter, and real-time cart updates",
        "Clean design system with reusable component library",
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "React Router"],
    },
    backendView: {
      heading: "Backend Architecture",
      diagram: `┌──────────┐    REST    ┌──────────┐
│  React   │◄────────►│  Express │
│  Client  │   JWT    │   API    │
└──────────┘          └────┬─────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────▼───┐  ┌─────▼────┐  ┌───▼────┐
         │  Auth  │  │ Payment  │  │ Course │
         │Middleware│ │ Service  │  │  CRUD  │
         └────┬───┘  └─────┬────┘  └───┬────┘
              │            │            │
              └────────────┼────────────┘
                           │
                     ┌─────▼─────┐
                     │  MongoDB  │
                     │  Atlas    │
                     └───────────┘`,
      points: [
        "Express.js REST API with MVC pattern and middleware chain",
        "JWT authentication with role-based access control (Admin/User)",
        "Integrated payment workflow with transactional course purchases",
        "MongoDB with Mongoose ODM for flexible document schemas",
      ],
      tech: ["Node.js", "Express", "MongoDB", "JWT", "TypeScript"],
    },
    accent: "#00E5FF", // Electric Blue
  },
  {
    title: "Real-Time Collaboration Platform",
    subtitle: "Accessible & Low-Latency",
    description:
      "A WCAG-accessible platform enabling real-time multi-user collaboration with significant (40%) latency reduction over REST approaches.",
    frontendView: {
      heading: "Frontend Architecture",
      points: [
        "React/TypeScript SPA with WCAG 2.1 AA accessibility compliance",
        "Real-time UI updates via WebSocket event listeners and optimistic rendering",
        "Keyboard-navigable interface with ARIA labels and screen reader support",
        "Code-split modules for sub-second initial load times",
      ],
      tech: ["React", "TypeScript", "WebSockets", "ARIA/WCAG"],
    },
    backendView: {
      heading: "Backend Architecture",
      diagram: `┌──────────┐  WebSocket  ┌───────────┐
│  React   │◄──────────►│  WS Hub   │
│  Client  │            │  (Node)   │
└──────────┘            └─────┬─────┘
                              │
                    ┌─────────┼─────────┐
                    │         │         │
               ┌────▼──┐ ┌───▼────┐ ┌──▼─────┐
               │ Sync  │ │  gRPC  │ │ Presence│
               │Engine │ │Services│ │ Manager │
               └───┬───┘ └───┬────┘ └───┬─────┘
                   │         │          │
                   └─────────┼──────────┘
                             │
                    ┌────────▼────────┐
                    │   PostgreSQL    │
                    │  + Redis Cache  │
                    └─────────────────┘`,
      points: [
        "WebSocket hub for bi-directional real-time event streaming",
        "gRPC microservices for inter-service communication (40% latency reduction vs REST)",
        "Redis-backed presence management and session caching",
        "Conflict resolution engine for concurrent edits",
      ],
      tech: ["Node.js", "WebSockets", "gRPC", "Redis", "PostgreSQL"],
    },
    accent: "#00E5FF",
  },
  {
    title: "Healthcare Claim Anomaly Detection",
    subtitle: "Cloud-Scale Data Pipeline",
    description:
      "End-to-end cloud data pipeline processing hundreds of thousands of records to detect invisible healthcare claim anomalies effectively.",
    frontendView: {
      heading: "Dashboard & Visualization",
      points: [
        "Amazon QuickSight dashboards for interactive anomaly exploration",
        "Real-time KPI widgets: fraud rate, claim volume, top anomaly categories",
        "Filterable drill-down views by region, provider, and claim type",
        "Automated report generation with scheduled email distribution",
      ],
      tech: ["QuickSight", "SQL", "Data Viz", "Reporting"],
    },
    backendView: {
      heading: "Data Pipeline Architecture",
      diagram: `┌───────────┐          ┌───────────┐
│  Raw CSV  │─────────►│  AWS S3   │
│  Sources  │  Ingest  │  (Lake)   │
└───────────┘          └─────┬─────┘
                             │
                       ┌─────▼─────┐
                       │ AWS Glue  │
                       │  Crawler  │
                       └─────┬─────┘
                             │
                       ┌─────▼─────┐
                       │  PySpark  │
                       │  ETL Jobs │
                       │  on EMR   │
                       └─────┬─────┘
                             │
                       ┌─────▼─────┐
                       │  Redshift │
                       │Warehouse  │
                       └─────┬─────┘
                             │
                       ┌─────▼──────┐
                       │ QuickSight │
                       │ Dashboards │
                       └────────────┘`,
      points: [
        "3-layer pipeline: Ingestion (S3) → Transformation (PySpark) → Warehousing (Redshift)",
        "AWS Glue crawlers for automatic schema detection and catalog management",
        "PySpark jobs processing 300K+ claims with anomaly scoring algorithms",
        "Optimized Redshift queries with sort/dist keys for sub-second dashboard loads",
      ],
      tech: ["PySpark", "AWS Glue", "Redshift", "AWS EMR"],
    },
    accent: "#FF9900", // AWS Orange
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-visible">
      
      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-mono tracking-wide">Featured Work</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0088FF] pb-1 inline-block">Showcase</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            A deep dive into the architecture and execution of my most complex engineering projects across frontend, backend, and cloud domains.
          </p>
        </motion.div>

        {/* Larger gap and grid config adapted for detailed cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-stretch">
          {projectsData.map((project, index) => (
            <div key={project.title} className="h-full">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
