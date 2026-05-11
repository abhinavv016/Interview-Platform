import React from "react";
import { Code2, Clock, Trophy } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

/**
 * Interface defining the structure of a single session object
 */
interface RecentSession {
  id: string;
  problem: string;
  difficulty: string;
  status: "active" | "completed";
  createdAt: string;
  updatedAt: string;
  participant?: any;
}

/**
 * Component Props Interface
 */
interface RecentSessionsProps {
  sessions: RecentSession[];
  isLoading: boolean;
}

const RecentSessions: React.FC<RecentSessionsProps> = ({ sessions, isLoading }) => {
  return (
    <div className="space-y-6">
      {/* GRID LOG */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          // Loading State
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white/2 border border-white/5 rounded-2xl animate-pulse" />
          ))
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div 
              key={session.id} 
              className="group relative bg-white/2 border border-white/5 rounded-2xl p-5 transition-all hover:border-white/20 hover:bg-white/4"
            >
              {/* Status Indicator */}
              <div className="flex items-start justify-between mb-4">
                <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/20 transition-all">
                  <Code2 className="size-5 text-stone-500 group-hover:text-cyan-400" />
                </div>
                
                {session.status === "active" ? (
                  <div className="flex items-center gap-1 font-mono text-[9px] text-emerald-400 tracking-widest">
                    <span className="size-1 bg-emerald-500 rounded-full animate-pulse" />
                    LIVE
                  </div>
                ) : (
                  <span className="font-mono text-[9px] text-stone-600 uppercase tracking-widest">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Session Info */}
              <h4 className="text-white font-bold text-sm mb-1 truncate tracking-tight">
                {session.problem}
              </h4>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-stone-500">
                <span className="uppercase text-stone-600">{session.difficulty}</span>
                <span className="size-1 bg-stone-800 rounded-full" />
                <span className="flex items-center gap-1">
                  <Clock size={10} /> 
                  {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                </span>
              </div>

              {/* Bottom Decorative Element */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono text-stone-700 uppercase tracking-tighter">
                  Log_{session.id?.slice(-6) || "000000"}
                </span>
                <span className="text-[9px] font-mono text-stone-700 uppercase">
                   {session.participant ? "Multi" : "Solo"}
                </span>
              </div>
            </div>
          ))
        ) : (
          // Empty State
          <div className="col-span-full py-16 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-3xl">
            <div className="p-4 bg-white/2 rounded-full mb-4">
               <Trophy size={24} className="text-stone-800" />
            </div>
            <p className="font-mono text-stone-600 text-xs uppercase tracking-widest">
              Historical logs empty. Begin your first session.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentSessions;