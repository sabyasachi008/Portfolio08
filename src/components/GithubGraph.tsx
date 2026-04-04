"use client";
import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { Github, RefreshCw } from "lucide-react";

const CACHE_KEY = "github-calendar-sabyasachi008";

export default function GithubGraph() {
  const [mounted, setMounted] = React.useState(false);
  const [cacheVersion, setCacheVersion] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    setCacheVersion(v => v + 1);
  };

  const explicitTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161B22', '#004d55', '#008796', '#00b8d4', '#00E5FF'],
  };

  return (
    <div className="w-full mt-24 max-w-5xl mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-8 md:p-12 flex flex-col items-center bg-[#0A0F17]/80 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#00E5FF] rounded-full blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <Github className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Open Source Contributions</h3>
              <p className="text-white/50 text-sm mt-1">Real-time stats from GitHub (`sabyasachi008`)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={clearCache}
              className="px-3 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10 transition-colors text-xs font-medium flex items-center gap-2"
              title="Refresh contributions"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <a
              href="https://github.com/sabyasachi008"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-white/5 text-white hover:bg-white/10 border border-white/10 transition-colors text-sm font-semibold flex items-center gap-2"
            >
              Follow on GitHub
            </a>
          </div>
        </div>

        <div className="w-full overflow-x-auto pb-4 custom-scrollbar" key={cacheVersion}>
          <div className="min-w-[800px] flex justify-center">
            {mounted ? (
              <GitHubCalendar 
                username="sabyasachi008" 
                colorScheme="dark"
                theme={explicitTheme}
                fontSize={14}
                blockSize={13}
                blockMargin={5}
                blockRadius={3}
              />
            ) : (
              <div className="w-full h-[150px] animate-pulse bg-white/5 rounded-xl border border-white/5 flex items-center justify-center">
                <p className="text-white/20 text-xs font-mono tracking-widest uppercase">Loading Contribution Data...</p>
              </div>
            )}
          </div>
        </div>
        
</motion.div>
    </div>
  );
}
