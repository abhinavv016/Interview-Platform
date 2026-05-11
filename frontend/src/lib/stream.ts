import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY as string;

// Global singleton instance
let client: StreamVideoClient | null = null;
let activeUserId: string | null = null;

// Strict interface to satisfy Stream's 'authenticated' user requirement
interface StreamAuthUser {
    id: string;
    name: string;
    image: string;
    type: 'authenticated';
}

/**
 * Initializes the Stream client. 
 * Uses strict typing to prevent "No overload matches this call" errors.
 */
export const initializeStreamClient = async (
    userData: { id: string; name: string; image: string },
    token: string
): Promise<StreamVideoClient> => {
    if (!apiKey) throw new Error("VITE_STREAM_API_KEY is missing.");

    // If client exists for the current user, reuse it
    if (client && activeUserId === userData.id) {
        return client;
    }

    // If a different node is active, disconnect it
    if (client) {
        await disconnectStreamClient();
    }

    const user: StreamAuthUser = {
        id: userData.id,
        name: userData.name || "Operator",
        image: userData.image || "",
        type: 'authenticated',
    };

    client = new StreamVideoClient({
        apiKey,
        user,
        token,
    });

    return client;
};

export const disconnectStreamClient = async (): Promise<void> => {
    if (client) {
        try {
            await client.disconnectUser();
            client = null;
        } catch (error) {
            console.error("[Stream.sys] Disconnect_Error:", error);
        }
    }
};