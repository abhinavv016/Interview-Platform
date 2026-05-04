import React from "react";
import { getDifficultyBadgeClass } from "../lib/utils";

export type Difficulty = "Easy" | "Medium" | "Hard";
export interface Problem { id: string; title: string; difficulty: Difficulty; category: string; description: { text: string; notes: string[] }; examples: { input: string; output: string; explanation?: string }[]; constraints: string[] }

const ProblemDescription: React.FC<{ problem: Problem; currentProblemId: string; onProblemChange: (id: string) => void; allProblems: Pick<Problem, "id" | "title" | "difficulty">[] }> = ({ problem, currentProblemId, onProblemChange, allProblems }) => {
  return (
    <div className="h-full overflow-y-auto bg-[#0a0d0a] custom-scrollbar">
      <div className="sticky top-0 z-10 p-8 bg-[#0a0d0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold tracking-tight text-white font-serif-display italic">{problem.title}</h1>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest border ${getDifficultyBadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
        </div>
        <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 font-mono text-xs text-stone-400 outline-none focus:border-cyan-400/50 transition-all" value={currentProblemId} onChange={(e) => onProblemChange(e.target.value)}>
          {allProblems.map(p => <option key={p.id} value={p.id} className="bg-[#0a0d0a]">{p.title} — {p.difficulty}</option>)}
        </select>
      </div>
      <div className="p-8 space-y-12">
        <section>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-4">Description</h3>
          <div className="text-stone-300 text-[15px] leading-relaxed space-y-4">
            <p>{problem.description.text}</p>
            {problem.description.notes.map((n, i) => <p key={i} className="text-stone-500 italic text-sm border-l border-cyan-400/20 pl-4">{n}</p>)}
          </div>
        </section>
        <section>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-4">Examples</h3>
          <div className="space-y-6">
            {problem.examples.map((ex, i) => (
              <div key={i} className="bg-white/2 border border-white/5 rounded-2xl p-5 space-y-3 font-mono text-[13px]">
                <div className="flex gap-4"><span className="text-cyan-400 font-bold min-w-[60px]">Input:</span><span className="text-stone-300 italic">{ex.input}</span></div>
                <div className="flex gap-4"><span className="text-emerald-400 font-bold min-w-[60px]">Output:</span><span className="text-stone-300">{ex.output}</span></div>
                {ex.explanation && <div className="pt-3 border-t border-white/5 text-stone-500 text-xs leading-relaxed"><span className="text-stone-400 font-bold mr-2">Explanation:</span>{ex.explanation}</div>}
              </div>
            ))}
          </div>
        </section>
        <section className="pb-10">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-4">Constraints</h3>
          <ul className="space-y-3">
            {problem.constraints.map((c, i) => <li key={i} className="flex gap-3 text-sm text-stone-400 font-mono"><span className="text-cyan-400">↳</span><code>{c}</code></li>)}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ProblemDescription;