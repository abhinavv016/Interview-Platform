import {
  CallControls,
  CallingState,
  useCallStateHooks,
  StreamTheme,
  ParticipantView,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, Hash } from "lucide-react";
import { useNavigate } from "react-router";
import { 
  Channel, 
  Chat, 
  MessageComposer, 
  MessageList, 
  Window 
} from "stream-chat-react";

// CSS Assets
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/index.css";

interface VideoCallUIProps {
  chatClient: any;
  channel: any;
}

function VideoCallUI({ chatClient, channel }: VideoCallUIProps) {
  const navigate = useNavigate();
  const { useCallCallingState, useRemoteParticipants, useLocalParticipant } = useCallStateHooks();
  
  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 bg-[#0a0d0a]">
        <Loader2Icon className="w-6 h-6 animate-spin text-cyan-400" />
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-stone-600 font-bold">Establishing_Link...</p>
      </div>
    );
  }

  return (
    <StreamTheme>
      <div className="h-full flex flex-col bg-black overflow-hidden">
        
        {/* TOP SECTION: SIDE-BY-SIDE VIDEOS */}
        <div className="flex-[0.6] min-h-[300px] grid grid-cols-2 gap-px bg-white/5 border-b border-white/10">
          
          {/* Local Participant (You) */}
          <div className="relative bg-[#050705] group">
            {localParticipant ? (
              <ParticipantView 
                participant={localParticipant} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-[#0a0d0a]">
                 <p className="font-mono text-[9px] text-stone-700 uppercase italic">Camera_Offline</p>
              </div>
            )}
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/5 rounded">
              <span className="font-mono text-[8px] text-cyan-400 uppercase tracking-widest">Local_Node (You)</span>
            </div>
          </div>

          {/* Remote Participant (Peer) */}
          <div className="relative bg-[#050705] group">
            {remoteParticipants[0] ? (
              <ParticipantView 
                participant={remoteParticipants[0]} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-[#0a0d0a] space-y-3">
                 <div className="size-1 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]" />
                 <p className="font-mono text-[9px] text-stone-600 uppercase tracking-tighter">Waiting_For_Peer...</p>
              </div>
            )}
             <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/5 rounded">
              <span className="font-mono text-[8px] text-stone-400 uppercase tracking-widest">Remote_Node</span>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: CALL CONTROLS BAR */}
        <div className="flex-none h-14 bg-[#0d110d] border-b border-white/5 flex items-center justify-center px-4">
            <div className="scale-75 origin-center grayscale hover:grayscale-0 transition-all">
                <CallControls onLeave={() => navigate("/dashboard")} />
            </div>
        </div>

        {/* BOTTOM SECTION: CHAT PANEL */}
        <div className="flex-[0.4] flex flex-col bg-[#0a0d0a] overflow-hidden">
          {chatClient && channel ? (
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="px-4 py-2 border-b border-white/5 flex items-center gap-4 bg-black/20">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500">
                  <Hash size={10} className="text-cyan-400" /> Session_Logs
                </div>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-hidden stream-chat-dark custom-scrollbar-mini">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList hideDeletedMessages />
                      <div className="px-4 py-3 bg-black/40 border-t border-white/5">
                        <MessageComposer focus />
                      </div>
                    </Window>
                  </Channel>
                </Chat>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
               <span className="font-mono text-[9px] text-stone-800 uppercase tracking-widest">Chat_Uplink_Disabled</span>
            </div>
          )}
        </div>
      </div>
    </StreamTheme>
  );
}

export default VideoCallUI;