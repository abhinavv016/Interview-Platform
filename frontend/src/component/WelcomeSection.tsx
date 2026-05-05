import React from "react";
import { ZapIcon, ArrowRightIcon } from "lucide-react";

interface WelcomeSectionProps {
  onCreateSession: () => void;
  user: any; // Ideally replace 'any' with Clerk's User type
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onCreateSession, user }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/5">
      <div className="space-y-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500">
          [00] / user.authenticated / dashboard
        </div>
        <h1 className="text-[56px] lg:text-[72px] leading-[0.9] tracking-[-0.04em] font-semibold text-white">
          System <br />
          <span className="font-serif-display italic text-cyan-400">initialized</span>
        </h1>
        <p className="text-stone-500 font-mono text-sm tracking-tight uppercase">
          Welcome back, {user?.firstName || "Operator"}. 
        </p>
      </div>

      <button
        onClick={onCreateSession}
        className="group flex items-center gap-4 bg-cyan-400 hover:bg-white text-black px-8 py-5 rounded-2xl transition-all duration-300"
      >
        <ZapIcon className="size-5 fill-current" />
        <span className="font-bold font-mono text-xs uppercase tracking-widest">Establish Session</span>
        <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
export default WelcomeSection;