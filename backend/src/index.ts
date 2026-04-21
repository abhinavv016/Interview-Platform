import express from "express";
import { ENV } from "./lib/env";
import cors from "cors";
import { serve } from "inngest/express";
import { functions, inngest } from "./lib/inngest";
import { handleClerkWebhook } from "./lib/clerk-webhook";

const app = express();

app.use(express.json())
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true,
}));

app.post("/webhooks/clerk", handleClerkWebhook);

app.use("/api/inngest", serve({client:inngest, functions}))

app.get("/health", (req, res) => {
  res.status(200).json({
    msg: "health endpoint is up and running",
  });
});

app.get("/api/books", (req, res) => {
  res.json([
    { id: 1, name: "Atomic Habits" },
    { id: 2, name: "Deep Work" }
  ]);
});



app.listen(ENV.PORT, () =>
  console.log("port running on", ENV.PORT)
);