import express, { Request, Response } from "express";
import { ENV } from "./lib/env";
import cors from "cors";
import { serve } from "inngest/express";
import { functions, inngest } from "./lib/inngest";
import { handleClerkWebhook } from "./lib/clerk-webhook";
import { clerkMiddleware } from '@clerk/express'
import chatRoutes from "./routes/chatRoutes";

const app = express();

app.use(express.json())
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true,
}));
app.use(clerkMiddleware())
app.use("/api/chat",chatRoutes)

app.post("/webhooks/clerk", handleClerkWebhook);

app.all("/api/inngest", serve({client:inngest, functions}))

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    msg: "health endpoint is up and running",
  });
});

app.listen(ENV.PORT, () =>
  console.log("port running on", ENV.PORT)
);