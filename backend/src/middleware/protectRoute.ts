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
        return res.status(401).json({ message: "Unauthorized - invalid token" });
      }

      const user = await prisma.user.findUnique({
        where: { clerkId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectRoute Middleware", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
];