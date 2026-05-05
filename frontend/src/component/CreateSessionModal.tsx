import React from "react";
import { Code2Icon, LoaderIcon, PlusIcon, X } from "lucide-react";
import { PROBLEMS } from "../data/problems";

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomConfig: { problem: string; difficulty: string };
  setRoomConfig: React.Dispatch<React.SetStateAction<{ problem: string; difficulty: string }>>;
  onCreateRoom: () => void;
  isCreating: boolean;
}

const CreateSessionModal: React.FC<CreateSessionModalProps> = ({ 
  isOpen, 
  onClose, 
  roomConfig, 
  setRoomConfig, 
  onCreateRoom, 
  isCreating 
}) => {
  const problems = Object.values(PROBLEMS);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
      <div className="relative w-full max-w-xl bg-[#0d110d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden grain">
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
               <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400 mb-1">system.init</div>
               <h3 className="text-3xl font-serif-display italic text-white">Create Session</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-stone-500 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Target Problem</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 font-mono text-sm text-stone-300 outline-none focus:border-cyan-400/50 transition-all appearance-none cursor-pointer"
                value={roomConfig.problem}
                onChange={(e) => {
                  const selected = problems.find((p) => p.title === e.target.value);
                  if (selected) {
                    setRoomConfig({ difficulty: selected.difficulty, problem: e.target.value });
                  }
                }}
              >
                <option value="" className="bg-[#0d110d]">Select a challenge...</option>
                {problems.map((p) => (
                  <option key={p.id} value={p.title} className="bg-[#0d110d]">{p.title} ({p.difficulty})</option>
                ))}
              </select>
            </div>

            {roomConfig.problem && (
              <div className="bg-cyan-400/5 border border-cyan-400/20 rounded-xl p-5 flex gap-4 items-start animate-in fade-in slide-in-from-top-2">
                <Code2Icon className="text-cyan-400 size-5 mt-1" />
                <div className="font-mono text-xs space-y-1">
                  <p className="text-stone-500 uppercase tracking-tighter">Configuration Confirmed</p>
                  <p className="text-cyan-400 font-bold">{roomConfig.problem}</p>
                  <p className="text-stone-500">1-on-1 Peer Session / Peer Review Mode</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button className="flex-1 py-4 font-mono text-[11px] uppercase tracking-widest text-stone-500 hover:text-white border border-white/5 hover:bg-white/5 rounded-xl transition-all" onClick={onClose}>
              Abort
            </button>
            <button
              className="flex-1 py-4 bg-cyan-400 hover:bg-white text-black font-bold font-mono text-[11px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              onClick={onCreateRoom}
              disabled={isCreating || !roomConfig.problem}
            >
              {isCreating ? <LoaderIcon className="size-4 animate-spin" /> : <PlusIcon className="size-4" />}
              {isCreating ? "Initializing..." : "Establish Session"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateSessionModal;