import { Response } from "express";
import { AuthRequest } from "../middleware/protectRoute";
import prisma from "../lib/prisma";
import { chatClient, streamClient } from "../lib/stream";

export async function createSession(req: AuthRequest, res: Response) {
    try {
        const { problem, difficulty } = req.body
        const userId = req.user.id
        const clerkId = req.user.clerkId

        if (!problem || !difficulty) {
            return res.status(400).json({
                message: "Problem and Difficulty are required"
            })
        }

        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        const session = await prisma.session.create({
            data: {
                problem,
                difficulty,
                hostId: userId,
                callId,
            }
        })

        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: { problem, difficulty, sessionId: session.id.toString() },
            }
        })

        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId]
        } as any)

        await channel.create();
        res.status(201).json({ session })
    } catch (error: any) {
        console.log("Error in createSession controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function getActiveSessions(req: AuthRequest, res: Response) {
    try {
        const sessions = await prisma.session.findMany({
            where: {
                status: "ACTIVE"
            },
            include: {
                host: {
                    select: {
                        name: true,
                        profileImage: true,
                        email: true,
                        clerkId: true,
                    },
                },
                participant: {
                    select: {
                        name: true,
                        profileImage: true,
                        email: true,
                        clerkId: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 20,
        });

        res.status(200).json({ sessions });
    } catch (error: any) {
        console.log("Error in getActiveSessions controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getMyRecentSessions(req: AuthRequest, res: Response) {
    try {
        const userId = req.user.id;
        const sessions = await prisma.session.findMany({
            where: {
                status: "COMPLETED",
                OR: [
                    { hostId: userId },
                    { participantId: userId },
                ],
            },
            include: {
                host: {
                    select: {
                        name: true,
                        profileImage: true,
                        email: true,
                        clerkId: true,
                    },
                },
                participant: {
                    select: {
                        name: true,
                        profileImage: true,
                        email: true,
                        clerkId: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 20,
        });

        res.status(200).json({ sessions });

    } catch (error: any) {
        console.log("Error in getMyRecentSessions controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getSessionById(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid session id" });
        }

        const session = await prisma.session.findUnique({
            where: { id },
            include: {
                host: {
                    select: {
                        name: true,
                        profileImage: true,
                        email: true,
                        clerkId: true,
                    },
                },
                participant: {
                    select: {
                        name: true,
                        profileImage: true,
                        email: true,
                        clerkId: true,
                    },
                },
            },
        })

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        return res.status(200).json({ session });
    } catch (error: any) {
        console.log("Error in getSessionById controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function joinSession(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const clerkId = req.user.clerkId;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid session id" });
        }

        const result = await prisma.session.updateMany({
            where: {
                id,
                status: "ACTIVE",
                participantId: null,
                NOT: {
                    hostId: userId,
                },
            },
            data: {
                participantId: userId,
            },
        });

        if (result.count == 0) {
            return res.status(409).json({
                message: "Session is full or invalid",
            });
        }

        const session = await prisma.session.findUnique({
            where: { id },
        });

        

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);

        return res.status(200).json({ session });

    } catch (error: any) {
        console.log("Error in joinSession controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function endSession(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid session id" });
        }

        const result = await prisma.session.updateMany({
            where: {
                id,
                hostId: userId,
                status: "ACTIVE",
            },
            data: {
                status: "COMPLETED",
            },
        });

        if (result.count === 0) {
            return res.status(403).json({
                message: "Not allowed or session already completed",
            });
        }

        const session = await prisma.session.findUnique({
            where: { id },
        });

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        try {
            const call = streamClient.video.call("default", session.callId);
            await call.delete({ hard: true });
        } catch (err: any) {
            console.error("Failed to delete Stream call:", err.message);
        }

        try {
            const channel = chatClient.channel("messaging", session.callId);
            await channel.delete();
        } catch (err: any) {
            console.error("Failed to delete Stream channel:", err.message);
        }

        return res.status(200).json({
            session,
            message: "Session ended successfully",
        });

    } catch (error: any) {
        console.log("Error in endSession controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}