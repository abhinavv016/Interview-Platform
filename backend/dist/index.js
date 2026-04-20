"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./lib/env");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
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
app.listen(env_1.ENV.PORT, () => console.log("port running on", env_1.ENV.PORT));
//# sourceMappingURL=index.js.map