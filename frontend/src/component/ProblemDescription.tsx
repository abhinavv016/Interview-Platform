import React from "react";


export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: {
    text: string;
    notes: string[];
  };
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
}

interface ProblemDescriptionProps {
  problem: Problem;
  currentProblemId: string;
  onProblemChange: (id: string) => void;
  allProblems: Pick<Problem, "id" | "title" | "difficulty">[];
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) => {

  const getDifficultyStyles = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Hard":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-stone-500/10 text-stone-500 border-stone-500/20";
    }
  };


  return (
    <div className="h-full overflow-y-auto bg-[#0a0d0a] custom-scrollbar">
      {/* Header Section */}
      <div className="sticky top-0 z-10 p-8 bg-[#0a0d0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2">
          <span className="text-cyan-400">./</span>
          <span>{problem.category.split('•')[0].trim()}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-serif-display italic tracking-tight text-white leading-none">
            {problem.title}
            <span className="text-cyan-400 not-italic">.</span>
          </h1>
          <span className={`px-4 py-1.5 rounded-md text-[11px] font-black font-mono uppercase tracking-widest border ${getDifficultyStyles(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>

        <select
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3 font-mono text-xs  text-stone-400 outline-none focus:border-cyan-400/50 transition-all cursor-pointer"
          value={currentProblemId}
          onChange={(e) => onProblemChange(e.target.value)}
        >
          {allProblems.map((p) => (
            <option key={p.id} value={p.id} className="bg-[#0a0d0a]">
              {p.title} — {p.difficulty}
            </option>
          ))}
        </select>
      </div>

      <div className="p-8 space-y-12">
        {/* Description Section */}
        <section>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-4">
            Description
          </h3>
          <div className="text-stone-300 text-[15px] leading-relaxed space-y-4">
            <p>{problem.description.text}</p>
            {problem.description.notes.map((n, i) => (
              <p
                key={i}
                className="text-stone-500 italic text-sm border-l border-cyan-400/20 pl-4"
              >
                {n}
              </p>
            ))}
          </div>
        </section>

        {/* Examples Section */}
        <section>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-4">
            Examples
          </h3>
          <div className="space-y-6">
            {problem.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-white/2 border border-white/5 rounded-2xl p-5 space-y-3 font-mono text-[13px]"
              >
                <div className="flex gap-4">
                  <span className="text-cyan-400 font-bold min-w-[60px]">
                    Input:
                  </span>
                  <span className="text-stone-300 italic">{ex.input}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-emerald-400 font-bold min-w-[60px]">
                    Output:
                  </span>
                  <span className="text-stone-300">{ex.output}</span>
                </div>
                {ex.explanation && (
                  <div className="pt-3 border-t border-white/5 text-stone-500 text-xs leading-relaxed">
                    <span className="text-stone-400 font-bold mr-2">
                      Explanation:
                    </span>
                    {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Constraints Section */}
        <section className="pb-10">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-4">
            Constraints
          </h3>
          {/* Added: Red color box container for constraints */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <ul className="space-y-3">
              {problem.constraints.map((c, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-stone-400 font-mono items-start"
                >
                  <span className="text-red-500 font-bold">↳</span>
                  <code className="text-red-200/70">{c}</code>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProblemDescription;