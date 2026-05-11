import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY as string | undefined;

let client: StreamVideoClient | null = null;
let activeUserId: string | null = null;

interface StreamAuthUser {
    id: string;
    name: string;
    image: string;
    type: 'authenticated';
}

export const initializeStreamClient = async (
    userData: { id: string; name: string; image: string },
    token: string
): Promise<StreamVideoClient> => {
    if (!apiKey) throw new Error("VITE_STREAM_API_KEY is missing.");

    if (client && activeUserId === userData.id) {
        return client;
    }

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
            activeUserId = null;
        } catch (error) {
            console.error("[Stream.sys] Disconnect_Error:", error);
        }
    }
};