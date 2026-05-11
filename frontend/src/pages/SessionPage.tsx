import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import { Panel, Group, Separator } from "react-resizable-panels";
import { Loader2Icon, LogOutIcon, PhoneOffIcon, Terminal, Users, Info } from "lucide-react";

// Stream & Custom Components
import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import CodeEditorPanel from "../component/CodeEditorPanel";
import Navbar from "../component/navbar";
import OutputPanel from "../component/OutputPanel";
import VideoCallUI from "../component/VideoCallUI";


// Define the strict language type to satisfy CodeEditorPanel props
type SupportedLanguage = "javascript" | "python" | "java" | "cpp" | "c";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const [output, setOutput] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Fetch session using Neon ID
  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  // Typed state for the editor
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("javascript");
  const [code, setCode] = useState("");

  // 1. Sync starter code when problem or language changes
  useEffect(() => {
    if (problemData?.starterCode) {
      const starter = (problemData.starterCode as Record<string, string>)[selectedLanguage];
      if (starter) setCode(starter);
    }
  }, [problemData, selectedLanguage]);

  // 2. Auto-join logic
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;
    if (id) joinSessionMutation.mutate(id, { onSuccess: () => refetch() });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  // 3. Redirect when session ends
  useEffect(() => {
    if (session?.status === "COMPLETED") navigate("/dashboard");
  }, [session, navigate]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as SupportedLanguage;
    setSelectedLanguage(newLang);
    
    if (problemData?.starterCode) {
       const starter = (problemData.starterCode as Record<string, string>)[newLang];
       setCode(starter || "");
    }
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("Terminate session? This will disconnect all nodes.")) {
      if (id) endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  if (loadingSession) return (
    <div className="h-screen bg-[#0a0d0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2Icon className="animate-spin text-cyan-400 size-10" />
        <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">Accessing_Node...</span>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-[#0a0d0a] text-stone-200 flex flex-col overflow-hidden grain">
      <Navbar />

      <div className="flex-1 relative">
        <Group orientation="horizontal">
          
          {/* LEFT: Problem & Editor */}
          <Panel defaultSize={60} minSize={40}>
            <Group orientation="vertical">
              
              {/* PROBLEM DETAILS PANEL */}
              <Panel defaultSize={40} minSize={20}>
                <div className="h-full bg-white/2 border-r border-b border-white/5 overflow-y-auto custom-scrollbar">
                  <div className="p-8 border-b border-white/5 bg-[#0d110d]">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">Node.Challenge</div>
                        <h1 className="text-4xl font-serif-display italic text-white leading-none">
                          {session?.problem || "Null_Session"}
                        </h1>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="font-mono text-[9px] border border-white/10 px-3 py-1 rounded-full uppercase text-stone-500">
                          {session?.difficulty}
                        </div>
                        {isHost && (
                          <button onClick={handleEndSession} className="p-2 text-stone-500 hover:text-red-500 transition-colors">
                            <LogOutIcon size={18} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 font-mono text-[10px] text-stone-500 uppercase">
                       <span className="flex items-center gap-2"><Users size={12}/> {session?.host?.name}</span>
                       <span className="flex items-center gap-2 tracking-tighter italic">SYS_ID: {id?.slice(-8)}</span>
                    </div>
                  </div>

                  <div className="p-8 space-y-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-stone-500 uppercase tracking-widest">
                        <Info size={14}/> Description
                      </div>
                      <div className="prose prose-invert max-w-none text-stone-400 leading-relaxed text-sm">
                        <p>{problemData?.description.text}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center gap-2 font-mono text-[10px] text-stone-500 uppercase tracking-widest">
                        <Terminal size={14}/> Test_Cases
                      </div>
                      <div className="space-y-4">
                        {problemData?.examples.map((ex, i) => (
                          <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4 font-mono text-[11px]">
                             <div className="text-cyan-400/50 mb-2">// Case_{i+1}</div>
                             <div className="flex gap-2"><span className="text-stone-600">Input:</span> {ex.input}</div>
                             <div className="flex gap-2"><span className="text-stone-600">Output:</span> {ex.output}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>

              <Separator className="h-px bg-white/10 hover:bg-cyan-400/50 transition-colors" />

              {/* EDITOR & OUTPUT PANEL */}
              <Panel defaultSize={60}>
                 <Group orientation="vertical">
                    <Panel defaultSize={70}>
                       <CodeEditorPanel
                          selectedLanguage={selectedLanguage}
                          code={code}
                          isRunning={isRunning}
                          onLanguageChange={handleLanguageChange}
                          onCodeChange={(value) => setCode(value || "")}
                          onRunCode={handleRunCode}
                        />
                    </Panel>
                    <Separator className="h-px bg-white/10" />
                    <Panel defaultSize={30}>
                       <OutputPanel output={output} />
                    </Panel>
                 </Group>
              </Panel>
            </Group>
          </Panel>

          <Separator className="w-px bg-white/10 hover:bg-cyan-400/50 transition-colors" />

          {/* RIGHT: Video & Chat Panel */}
          <Panel defaultSize={40} minSize={30}>
             <div className="h-full bg-black/40 relative">
                <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
                
                {isInitializingCall ? (
                   <div className="h-full flex flex-col items-center justify-center space-y-4">
                      <div className="size-12 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Syncing Media Link...</span>
                   </div>
                ) : !streamClient || !call ? (
                   <div className="h-full flex items-center justify-center p-12">
                      <div className="text-center space-y-4 border border-red-500/20 bg-red-500/5 p-8 rounded-3xl">
                         <PhoneOffIcon className="mx-auto text-red-500 size-8" />
                         <div className="font-serif-display italic text-xl">Uplink Failed</div>
                         <p className="font-mono text-[10px] text-stone-500 uppercase tracking-tighter">Connection dropped by host</p>
                      </div>
                   </div>
                ) : (
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                )}
             </div>
          </Panel>

        </Group>
      </div>
    </div>
  );
}

export default SessionPage;