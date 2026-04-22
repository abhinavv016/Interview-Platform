import { Response } from "express";
import { chatClient } from "../lib/stream";
import { AuthRequest } from "../middleware/protectRoute";

export async function getStreamToken(req: AuthRequest, res: Response) {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "Unauthorized - user not found" })
        }

        const token = chatClient.createToken(req.user.clerkId);
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image
        });

    } catch (error: any) {
        console.log("Error in getStreamToken: ", error.message)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}