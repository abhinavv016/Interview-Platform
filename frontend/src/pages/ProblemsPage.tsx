import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router";
import { 
  ChevronRightIcon, 
  Code2Icon, 
  Loader2Icon, 
  SearchIcon, 
  Terminal,
  Cpu
} from "lucide-react";
import Navbar from "../component/navbar";
import { type Problem, GITHUB_DATA_SOURCE } from "../data/problems";
import { useVirtualizer } from "@tanstack/react-virtual";

export default function ProblemsPage() {
  const [allProblems, setAllProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const parentRef = useRef<HTMLDivElement>(null);

  const [time, setTime] = useState(new Date());

useEffect(() => {
  const timer = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(timer);
}, []);

  useEffect(() => {
    const hydrateDataset = async () => {
      try {
        const response = await fetch(GITHUB_DATA_SOURCE);
        const data = await response.json();
        const rawList = data.questions || data;

        const mapped: Problem[] = rawList.map((p: any) => ({
          id: p.problem_slug,
          title: p.title,
          difficulty: p.difficulty,
          category: p.topics?.join(" • ") || "General",
          // Description removed for performance and minimalist UI
          starterCode: {
            javascript: p.code_snippets?.javascript || "",
            python: p.code_snippets?.python3 || p.code_snippets?.python || "",
            java: p.code_snippets?.java || ""
          }
        }));

        setAllProblems(mapped);
      } catch (error) {
        console.error("Hydration Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    hydrateDataset();
  }, []);

  const filteredProblems = useMemo(() => {
    return allProblems.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === "All" || p.difficulty === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, allProblems]);

  const rowVirtualizer = useVirtualizer({
    count: filteredProblems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90, // Smaller estimate since we removed the description
    overscan: 10,
  });

  return (
    <div className="relative h-screen flex flex-col bg-[#0a0d0a] text-stone-100 selection:bg-cyan-400 selection:text-black overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-32 size-130 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 -right-40 size-105 rounded-full bg-blue-400/10 blur-[120px]" />
      </div>

      <Navbar />

      {/* SYSTEM STATUS BAR - New Top Component */}
<div className="bg-cyan-400/5 border-b border-cyan-400/10 py-2">
  <div className="max-w-310 mx-auto px-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em]">
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 text-cyan-400">
        <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
        System_Active
      </div>
      <div className="text-stone-500 hidden sm:block">
        Latency: <span className="text-stone-300">24ms</span>
      </div>
      <div className="text-stone-500 hidden sm:block">
        Engine: <span className="text-stone-300">v2.0.4-stable</span>
      </div>
    </div>
    
    <div className="flex items-center gap-4 text-stone-500">
      <div className="flex items-center gap-2 border-x border-white/5 px-4">
        <span className="text-stone-500">Local_Time:</span>
        <span className="text-cyan-400 tabular-nums">
          {time.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
          })}
        </span>
      </div>
      <span className="text-cyan-400/80">Region: India</span>
    </div>
  </div>
</div>

      {/* HEADER SECTION */}
      <div className="relative max-w-310 w-full mx-auto px-6 pt-12 lg:pt-16 pb-8 flex-none">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-8">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-4">
              [02] / problem.vault
            </div>
            <h1 className="text-[44px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] font-semibold">
              Problem <span className="font-serif-display italic text-cyan-400">Library</span>.
            </h1>
            {/* Catchy Tagline */}
            <p className="mt-6 text-stone-400 font-mono text-sm tracking-wide flex items-center gap-3">
              <Cpu className="size-4 text-cyan-400" />
              <span>&gt; execute_logic: sharpen your reflexes for the <span className="text-stone-100 font-bold">2026</span> placement cycle.</span>
            </p>
          </div>

          {/* SEARCH & FILTERS */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-80 group">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-stone-500 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="text"
                placeholder="Search_vault..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/3 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm font-mono focus:outline-none focus:border-cyan-400/40"
              />
            </div>
            
            <div className="flex bg-white/3 border border-white/10 p-1 rounded-xl">
              {["All", "Easy", "Medium", "Hard"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveFilter(lvl)}
                  className={`px-4 py-2 rounded-lg text-[11px] font-mono uppercase tracking-widest transition-all ${
                    activeFilter === lvl ? "bg-cyan-400 text-black font-bold" : "text-stone-500 hover:text-stone-200"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VIRTUALIZED LIST */}
      <div 
        ref={parentRef} 
        className="flex-1 overflow-y-auto overflow-x-hidden px-6 custom-scrollbar pb-10"
      >
        <div 
          className="max-w-310 mx-auto relative"
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2Icon className="size-10 text-cyan-400 animate-spin" />
              <span className="font-mono text-[10px] text-stone-500 uppercase tracking-[0.2em]">Syncing_Database...</span>
            </div>
          ) : filteredProblems.length > 0 ? (
            rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const problem = filteredProblems[virtualItem.index];
              return (
                <div
                  key={virtualItem.key}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                    padding: '6px 0' 
                  }}
                >
                  <Link
                    to={`/problem/${problem.id}`}
                    className="group relative flex h-full items-center justify-between rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-cyan-400/30 transition-all px-6 overflow-hidden"
                  >
                    <div className="absolute -top-20 -right-20 size-48 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/3 blur-2xl transition-all duration-700" />
                    
                    <div className="relative flex items-center gap-6 overflow-hidden">
                      <div className="size-11 rounded-lg bg-cyan-400/10 border border-cyan-400/20 grid place-items-center shrink-0 group-hover:bg-cyan-400/20 transition-colors">
                        <Code2Icon className="size-5 text-cyan-400" />
                      </div>
                      
                      <div className="min-w-0">
                        <div className="flex items-center gap-4">
                          <h2 className="text-lg font-semibold tracking-tight group-hover:text-cyan-400 transition-colors truncate">
                            {problem.title}
                          </h2>
                          <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full border ${getDifficultyStyle(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </div>
                        <p className="text-stone-500 text-[10px] font-mono mt-1 tracking-wider uppercase opacity-70">
                          {problem.category}
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-center gap-4 shrink-0">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-600 group-hover:text-cyan-400 transition-colors hidden md:inline">
                        ↳ Open_Engine
                      </span>
                      <div className="size-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-400 transition-all duration-300">
                        <ChevronRightIcon className="size-4 text-stone-500 group-hover:text-black transition-colors" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl">
              <Terminal className="size-8 text-stone-700 mx-auto mb-4" />
              <p className="text-stone-500 font-mono text-xs tracking-widest uppercase">Null pointer: no matches found.</p>
            </div>
          )}
        </div>
      </div> 
       
    </div>

    
  );
}

function getDifficultyStyle(difficulty: string) {
  const d = difficulty?.toLowerCase();
  if (d === "easy") return "border-emerald-500/30 text-emerald-400 bg-emerald-500/5";
  if (d === "medium") return "border-amber-500/30 text-amber-400 bg-amber-500/5";
  if (d === "hard") return "border-rose-500/30 text-rose-400 bg-rose-500/5";
  return "border-white/10 text-stone-400";
}