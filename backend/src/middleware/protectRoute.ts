import { clerkMiddleware, getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

export interface AuthRequest extends Request {
  user?: any;
}

export const protectRoute = [
  clerkMiddleware(),

  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { userId: clerkId } = getAuth(req);

      if (!clerkId) {
        return res.status(401).json({ msg: "Unauthorized - invalid token" });
      }

      const user = await prisma.user.findUnique({
        where: { clerkId },
      });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectionRoute Middleware", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
];