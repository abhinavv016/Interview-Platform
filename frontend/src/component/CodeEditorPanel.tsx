import React from "react";
import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon, Code2 } from "lucide-react";
import type { SupportedLanguage } from "../lib/piston";

export const LANGUAGE_CONFIG: Record<SupportedLanguage, { name: string; icon: string; monacoLang: string }> = {
  javascript: { name: "JavaScript", icon: "/javascript.png", monacoLang: "javascript" },
  python: { name: "Python", icon: "/python.png", monacoLang: "python" },
  java: { name: "Java", icon: "/java.png", monacoLang: "java" },
  cpp: { name: "C++", icon: "/cpp.png", monacoLang: "c++" },
  c: { name: "C", icon: "/c.png", monacoLang: "c" },
};

interface CodeEditorPanelProps {
  selectedLanguage: SupportedLanguage;
  code: string;
  isRunning: boolean;
  onLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCodeChange: (value: string | undefined) => void;
  onRunCode: () => void;
}

const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({ selectedLanguage, code, isRunning, onLanguageChange, onCodeChange, onRunCode }) => {
  return (
    <div className="h-full flex flex-col bg-[#0d110d]">
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-md border border-white/10">
            <img src={LANGUAGE_CONFIG[selectedLanguage].icon} alt="" className="size-4" />
            <select className="bg-transparent text-[11px] font-mono font-bold text-stone-300 outline-none uppercase tracking-widest cursor-pointer" value={selectedLanguage} onChange={onLanguageChange}>
              {Object.entries(LANGUAGE_CONFIG).map(([k, v]) => <option key={k} value={k} className="bg-[#0a0d0a]">{v.name}</option>)}
            </select>
          </div>
          <div className="hidden md:flex items-center gap-2 text-stone-600">
            <Code2 size={14} />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Main.{selectedLanguage === 'python' ? 'py' : selectedLanguage === 'java' ? 'java' : selectedLanguage === 'c' ? 'c' : selectedLanguage === 'cpp' ? 'cpp' : 'js'}</span>
          </div>
        </div>
        <button onClick={onRunCode} disabled={isRunning} className="group flex items-center gap-2 px-5 py-2 bg-cyan-400 text-black rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50">
          {isRunning ? <Loader2Icon className="size-3 animate-spin" /> : <PlayIcon className="size-3 fill-current" />}
          {isRunning ? "Running" : "Run Code"}
        </button>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{ fontSize: 14, fontLigatures: true, fontFamily: "'JetBrains Mono', monospace", minimap: { enabled: false }, padding: { top: 20 }, scrollBeyondLastLine: false, smoothScrolling: true }}
        />
      </div>
    </div>
  );
};

export default CodeEditorPanel;