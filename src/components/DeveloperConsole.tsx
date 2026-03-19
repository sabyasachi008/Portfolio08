"use client";
import React, { useState } from "react";
import { Terminal, Copy, Check, Play } from "lucide-react";

export default function DeveloperConsole() {
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    setOutput("Fetching skills data from /api/skills...\n");
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setTimeout(() => {
        setOutput(JSON.stringify(data, null, 2));
        setLoading(false);
      }, 300); // extra UI visual delay
    } catch (err) {
      setOutput(`Error: ${err}`);
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full glass rounded-2xl overflow-hidden shadow-2xl flex flex-col mt-8 hover:shadow-[0_0_30px_rgba(0,229,255,0.05)] transition-shadow">
      {/* Console Window Controls */}
      <div className="flex justify-between items-center bg-black/40 px-4 py-3 border-b border-white/5">
        <div className="flex gap-2 items-center">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
          <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-white/50 font-mono flex items-center gap-2 tracking-wide uppercase">
            <Terminal className="w-3 h-3" />
            Developer Console
          </span>
        </div>
        <div className="flex gap-2">
          {output && (
            <button
              onClick={copyToClipboard}
              className="text-white/50 hover:text-white transition-colors p-1"
              title="Copy Output"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Console Input Area */}
      <div className="p-5 bg-[#05080f] font-mono text-sm md:text-base">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 overflow-x-auto text-sm">
            <span className="text-[#00E5FF] whitespace-nowrap">sabyasachi@portfolio:~$</span>
            <span className="text-white whitespace-nowrap">curl -X GET /api/skills</span>
          </div>
          <button
            onClick={fetchSkills}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF]/20 rounded-lg transition-colors text-xs font-bold uppercase tracking-wider disabled:opacity-50 shrink-0"
          >
            <Play className="w-3.5 h-3.5" />
            Run Query
          </button>
        </div>

        {/* Console Output Area */}
        <div className={`w-full min-h-[250px] max-h-[400px] overflow-y-auto rounded-lg bg-black/80 p-5 border border-white/5 text-gray-300 shadow-inner ${loading ? 'animate-pulse' : ''} [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent`}>
          {output ? (
            <pre className="whitespace-pre-wrap"><code className="text-[#00E5FF] text-sm md:text-base leading-relaxed">{output}</code></pre>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-xs min-h-[200px]">
              <Terminal className="w-12 h-12 mb-3" />
              <span>Click "Run Query" to fetch live JSON response</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
