import express from "express";
import dotenv from "dotenv";
import path from "path";
import { ENV } from "./lib/env";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest } from "./inngest/inngest";
import { functions } from "./inngest/function"


dotenv.config({
  path: path.resolve(process.cwd(), "backend/.env")
});

const app = express();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL, credentials: true}));

app.use("/api/inngest", serve({
  client: inngest,
  functions
}))

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

const PORT = Number(process.env.PORT);

const rootDir = process.cwd();

if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(rootDir, "frontend", "dist");

  app.use(express.static(frontendPath));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});