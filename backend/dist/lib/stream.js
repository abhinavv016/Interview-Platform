"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStreamUser = exports.upsertStreamUser = exports.chatClient = void 0;
const stream_chat_1 = require("stream-chat");
const env_1 = require("./env");
const apiKey = env_1.ENV.STREAM_API_KEY;
const apiSecret = env_1.ENV.STREAM_API_SECRET;
if (!apiKey || !apiSecret) {
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}
exports.chatClient = stream_chat_1.StreamChat.getInstance(apiKey, apiSecret);
const upsertStreamUser = async (userData) => {
    try {
        await exports.chatClient.upsertUser(userData);
        return userData;
    }
    catch (error) {
        console.error("Error in upserting the Stream user: ", error);
    }
};
exports.upsertStreamUser = upsertStreamUser;
const deleteStreamUser = async (userId) => {
    try {
        await exports.chatClient.upsertUser(userId);
        console.log("Stream user deleted successfully: ", userId);
    }
    catch (error) {
        console.error("Error in deleting the Stream user: ", error);
    }
};
exports.deleteStreamUser = deleteStreamUser;
//# sourceMappingURL=stream.js.map