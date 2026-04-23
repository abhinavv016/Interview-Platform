import { StreamChat } from "stream-chat";
import { ENV } from "./env";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing")
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret)
export const streamClient = new StreamClient(apiKey, apiSecret)


export const upsertStreamUser = async(userData: any) => {
    try {
        await chatClient.upsertUser(userData)
        return userData;
    } catch (error) {
        console.error("Error in upserting the Stream user: ", error)

    }
}


export const deleteStreamUser = async(userId: any) => {
    try {
        await chatClient.upsertUser(userId)
        console.log("Stream user deleted successfully: ", userId)
    } catch (error) {
        console.error("Error in deleting the Stream user: ", error)

    }
}