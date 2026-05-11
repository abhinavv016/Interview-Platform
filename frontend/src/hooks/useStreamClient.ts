import { useState, useEffect } from "react";
import { StreamChat, Channel } from "stream-chat";
import { Call, StreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";

function useStreamClient(
    session: any,
    loadingSession: boolean,
    isHost: boolean,
    isParticipant: boolean
) {
    const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);
    const [chatClient, setChatClient] = useState<StreamChat | null>(null);
    const [channel, setChannel] = useState<Channel | null>(null);
    const [isInitializingCall, setIsInitializingCall] = useState(true);

    useEffect(() => {
        let videoCall: Call | null = null;
        let chatClientInstance: StreamChat | null = null;

        const initUplink = async () => {
            // Guard: Ensure session and user roles are ready
            if (!session?.callId || loadingSession) return;
            if (!isHost && !isParticipant) return;
            if (session.status === "completed") return;

            try {
                const { token, userId, userName, userImage } = await sessionApi.getStreamToken();

                if (!userId || !token) {
                    throw new Error("Missing credentials for media uplink.");
                }

                // Initialize Video
                const client = await initializeStreamClient(
                    {
                        id: userId,
                        name: userName ?? "Candidate",
                        image: userImage ?? "",
                    },
                    token
                );
                setStreamClient(client);

                videoCall = client.call("default", session.callId);
                await videoCall.join({ create: true });
                setCall(videoCall);

                // Initialize Chat
                const apiKey = import.meta.env.VITE_STREAM_API_KEY;
                if (!apiKey) {
                    throw new Error("VITE_STREAM_API_KEY environment variable is not configured");
                }
                chatClientInstance = StreamChat.getInstance(apiKey);

                await chatClientInstance.connectUser(
                    {
                        id: userId,
                        name: userName ?? "Candidate",
                        image: userImage ?? "",
                    },
                    token
                );
                setChatClient(chatClientInstance);

                const chatChannel = chatClientInstance.channel("messaging", session.callId);
                await chatChannel.watch();
                setChannel(chatChannel);

            } catch (error) {
                toast.error("Failed to connect. Please refresh the page.");
                console.error("[Stream.log] Uplink_Error:", error);
            } finally {
                setIsInitializingCall(false);
            }
        };

        initUplink();

        // Resource Cleanup
        return () => {
            if (videoCall && videoCall.state.callingState !== 'left') {
                videoCall.leave().catch(err => {
                    if (!(err instanceof Error && err.message.includes('already been left'))) {
                        console.error("[Stream.log] Cleanup_Error:", err);
                    }
                });
            }
            if (chatClientInstance) {
                chatClientInstance.disconnectUser().catch(err => {
                    console.error("[Stream.log] ChatCleanup_Error:", err);
                });
            }
            disconnectStreamClient().catch(err => {
                console.error("[Stream.log] StreamCleanup_Error:", err);
            });
        };
        // Dependency on session.id ensures stability for Neon Postgres records
    }, [session?.id, session?.status, loadingSession, isHost, isParticipant]);

    return {
        streamClient,
        call,
        chatClient,
        channel,
        isInitializingCall,
    };
}

export default useStreamClient;