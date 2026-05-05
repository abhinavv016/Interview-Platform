import React from "react";

interface StatsCardsProps {
  activeSessionsCount: number;
  recentSessionsCount: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ activeSessionsCount, recentSessionsCount }) => {
  const stats = [
    { label: "Pool.Size", value: activeSessionsCount, sub: "Active Now", color: "text-cyan-400" },
    { label: "User.Logs", value: recentSessionsCount, sub: "Total Sessions", color: "text-stone-500" }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-white/2 border border-white/5 rounded-2xl p-6 group hover:bg-white/4 transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-stone-600 group-hover:text-stone-400">{s.label}</span>
            <div className={`size-1.5 rounded-full ${s.color} bg-current`} />
          </div>
          <div className="text-4xl font-semibold tracking-tighter text-white">{s.value}</div>
          <p className="font-mono text-[10px] text-stone-700 mt-1 uppercase tracking-tighter">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
export default StatsCards;