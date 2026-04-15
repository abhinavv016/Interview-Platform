import express from "express";
import dotenv from "dotenv";
import path from "path";
import { ENV } from "./lib/env";

dotenv.config({
  path: path.resolve(process.cwd(), "backend/.env")
});

const app = express();

app.use(express.json());

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