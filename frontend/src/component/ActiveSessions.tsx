import React from "react";
import { Code2Icon, ZapIcon, LoaderIcon, UsersIcon, ShieldCheck } from "lucide-react";
import { Link } from "react-router";

interface Session {
  id: string;
  problem: string;
  difficulty: string;
  host: { name: string; clerkId: string };
  participant?: { name: string; clerkId: string };
}

interface ActiveSessionsProps {
  sessions: Session[];
  isLoading: boolean;
  isUserInSession: (session: Session) => boolean;
}

const ActiveSessions: React.FC<ActiveSessionsProps> = ({ sessions, isLoading, isUserInSession }) => {
  return (
    <div className="h-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
           <ZapIcon className="size-4 text-cyan-400" />
           <h2 className="text-xl font-bold tracking-tight text-white uppercase font-mono">Pool.live</h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400">
           <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
           {sessions.length} NODES ACTIVE
        </div>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {isLoading ? (
          <div className="py-20 flex justify-center"><LoaderIcon className="animate-spin text-stone-700" /></div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session.id} className="group relative bg-white/2 border border-white/5 hover:border-cyan-400/30 rounded-2xl p-5 transition-all">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 transition-all">
                    <Code2Icon className="size-6 text-stone-500 group-hover:text-black" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                       <h3 className="font-bold text-white tracking-tight">{session.problem}</h3>
                       <span className="text-[9px] font-mono border border-white/10 px-2 py-0.5 rounded text-stone-500 uppercase">{session.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-[10px] text-stone-500">
                       <span className="flex items-center gap-1.5"><ShieldCheck className="size-3 text-cyan-400" strokeWidth={2.5} /> {session.host?.name}</span>
                       <span className="flex items-center gap-1.5"><UsersIcon size={12}/> {session.participant ? "2/2" : "1/2"}</span>
                    </div>
                  </div>
                </div>
                
                <Link to={`/session/${session.id}`} className={`px-5 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all ${isUserInSession(session) ? "bg-white text-black font-bold" : "bg-white/5 text-stone-400 hover:bg-cyan-400 hover:text-black"}`}>
                   {isUserInSession(session) ? "Restore" : "Connect"}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl">
            <p className="font-mono text-stone-600 text-xs uppercase tracking-widest">No active sessions detected</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default ActiveSessions;