import express from "express";
import { ENV } from "./lib/env";
import cors from "cors";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173"
  ],
  credentials: true,
}));

app.get("/health", (req, res) => {
  res.status(200).json({
    msg: "health endpoint is up and running",
  });
});

app.get("/api/books", (_, res) => {
  res.json([
    { id: 1, name: "Atomic Habits" },
    { id: 2, name: "Deep Work" }
  ]);
});



app.listen(ENV.PORT, () =>
  console.log("port running on", ENV.PORT)
);