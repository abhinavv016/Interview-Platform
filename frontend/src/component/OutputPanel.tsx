import React from "react";
import { Terminal,  Info } from "lucide-react";
import type { ExecutionResult } from "../lib/piston";

const OutputPanel: React.FC<{ output: ExecutionResult | null }> = ({ output }) => {
  return (
    <div className="h-full bg-black flex flex-col">
      <div className="px-5 py-2.5 bg-white/2 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Terminal size={14} className="text-stone-500" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400">System Output</span>
        </div>
        {output && (
          <span className={`font-mono text-[10px] font-bold uppercase tracking-tighter ${output.success ? "text-emerald-400" : "text-rose-500"}`}>
            {output.success ? "✓ Success" : "✕ Error"}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-auto p-6 font-mono text-[13px] leading-relaxed bg-black/60">
        {output === null ? (
          <div className="h-full flex flex-col items-center justify-center text-stone-700 gap-3">
            <Info size={20} />
            <p className="text-[11px] uppercase tracking-widest">Awaiting execution...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {output.output && <pre className={`whitespace-pre-wrap ${output.success ? "text-emerald-300" : "text-stone-300"}`}>{output.output}</pre>}
            {output.error && (
              <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-lg">
                <p className="text-rose-500 text-[10px] font-bold uppercase mb-2">Runtime_Exception:</p>
                <pre className="text-rose-400/90 whitespace-pre-wrap text-xs">{output.error}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;