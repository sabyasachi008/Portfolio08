"use client";
import React, { useState, useRef, useEffect } from "react";
import { Terminal, Copy, Check } from "lucide-react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

function syntaxHighlight(json: string): string {
  if (!json) return "";
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^"\\])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let color = "#27C93F"; // string
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          color = "#00E5FF"; // key
        }
      } else if (/true|false/.test(match)) {
        color = "#FF5F56"; // boolean
      } else if (/-?\d+/.test(match)) {
        color = "#FFBD2E"; // number
      }
      return `<span style="color: ${color}">${match}</span>`;
    }
  );
}

interface CommandHistory {
  id: string;
  command: string;
  output: React.ReactNode | string;
  isError?: boolean;
}

export default function DeveloperTerminal() {
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      id: "init",
      command: "",
      output: "Welcome to Sabyasachi's Terminal Workspace.\nType 'help' to see available commands."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const copyToClipboard = () => {
    const textToCopy = history.map(h => `$ ${h.command}\n${typeof h.output === "string" ? h.output : "JSON Output"}`).join("\n\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const cmd = input.trim().toLowerCase();
    setInput("");

    const newId = Math.random().toString(36).substring(7);
    
    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    setLoading(true);

    let output: React.ReactNode | string = "";
    let isError = false;

    if (cmd === "help") {
      output = `Available commands:\n  help    - Show this message\n  whoami  - Display brief biography\n  skills  - Fetch technical skills via REST API\n  contact - Show contact information\n  clear   - Clear terminal screen`;
    } else if (cmd === "whoami") {
      output = `Sabyasachi Ghosh\nSoftware Engineer & Cloud Architect.\nPassionate about scalable systems, seamless UX, and building the future.`;
    } else if (cmd === "contact") {
      output = `Email:   sabyasachighosh008@gmail.com\nGitHub:  https://github.com/sabyasachi008\nLinkedIn: https://linkedin.com/in/sabyasachig008/`;
    } else if (cmd === "skills" || cmd === "fetch('/api/skills')") {
      try {
        const res = await fetch("/api/skills");
        const data = await res.json();
        const formatted = JSON.stringify(data, null, 2);
        output = (
          <div className="mt-2 text-sm">
            <div className="text-[11px] mb-2 text-white/40 flex items-center gap-2 font-sans tracking-wide">
              <span className="text-[#27C93F] font-bold text-sm">✓</span> 200 OK • application/json • {formatted.length} bytes
            </div>
            <pre
              className="whitespace-pre-wrap break-words leading-relaxed"
              dangerouslySetInnerHTML={{ __html: syntaxHighlight(formatted) }}
            />
          </div>
        );
      } catch (err) {
        output = "Failed to fetch /api/skills. Server might be down.";
        isError = true;
      }
    } else if (cmd === "sudo") {
      output = "Nice try. This incident will be reported.";
      isError = true;
    } else {
      output = `Command not found: ${cmd}. Type 'help' for a list of commands.`;
      isError = true;
    }

    setHistory(prev => [...prev, { id: newId, command: input.trim(), output, isError }]);
    setLoading(false);
    
    // Auto focus back on input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Zero-Gravity Spatial 3D Animation Hook
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
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
      whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0, 229, 255, 0.2)" }}
      className="w-full max-w-4xl mx-auto [perspective:1000px] mt-12 mb-10"
      onClick={() => inputRef.current?.focus()}
    >
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="w-full glass rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col border border-white/10 bg-[#0A0F17]/90 backdrop-blur-2xl cursor-text"
      >
        {/* Terminal Header */}
        <div className="flex justify-between items-center bg-[#030508]/80 px-5 py-3.5 border-b border-white/5 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20 text-black flex items-center justify-center hover:bg-[#ff4e45] transition-colors"><span className="opacity-0 hover:opacity-100 text-[8px] leading-none mb-0.5 pointer-events-none">x</span></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20 text-black flex items-center justify-center hover:bg-[#ffb012] transition-colors"><span className="opacity-0 hover:opacity-100 text-[8px] leading-none mb-0.5 pointer-events-none">-</span></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20 text-black flex items-center justify-center hover:bg-[#1dba31] transition-colors"><span className="opacity-0 hover:opacity-100 text-[8px] leading-none mb-0.5 pointer-events-none">+</span></div>
            <span className="ml-4 text-[11px] text-white/50 font-mono flex items-center gap-1.5 tracking-wide">
              <Terminal className="w-3 h-3" />
              sabyasachi@portfolio:~
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); copyToClipboard(); }}
              className="text-white/40 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10 z-10"
              title="Copy Terminal History"
              aria-label="Copy output"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#27C93F]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Console Output Area */}
        <div 
          ref={bodyRef}
          className="w-full h-[350px] overflow-y-auto p-5 md:p-6 bg-transparent font-mono text-sm flex flex-col gap-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
        >
          {history.map((h) => (
            <div key={h.id} className="flex flex-col mb-4">
              {h.command && (
                <div className="flex flex-wrap items-center gap-2.5 text-sm mb-1 text-white/90">
                  <span className="text-[#27C93F] font-semibold whitespace-nowrap">sabyasachi@portfolio</span>
                  <span className="text-white/30 whitespace-nowrap">:</span>
                  <span className="text-[#00E5FF] font-semibold whitespace-nowrap">~$</span>
                  <span className="tracking-wide break-all">{h.command}</span>
                </div>
              )}
              {h.output && (
                <div className={`text-[13px] md:text-sm leading-relaxed whitespace-pre-wrap ${h.isError ? "text-[#FF5F56]" : "text-white/70"}`}>
                  {h.output}
                </div>
              )}
            </div>
          ))}

          <form onSubmit={handleCommand} className="flex flex-wrap items-center gap-2.5 text-sm mt-2 relative">
            <span className="text-[#27C93F] font-semibold whitespace-nowrap">sabyasachi@portfolio</span>
            <span className="text-white/30 whitespace-nowrap">:</span>
            <span className="text-[#00E5FF] font-semibold whitespace-nowrap">~$</span>
            
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 bg-transparent border-none outline-none text-white/90 tracking-wide font-mono w-full min-w-[50px] disabled:opacity-50"
              autoComplete="off"
              spellCheck="false"
            />
            
            {loading && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="w-3 h-3 absolute right-0 border border-t-transparent border-[#00E5FF] rounded-full"
              />
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}
