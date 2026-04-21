"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./lib/env");
const cors_1 = __importDefault(require("cors"));
const express_2 = require("inngest/express");
const inngest_1 = require("./lib/inngest");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: env_1.ENV.CLIENT_URL,
    credentials: true,
}));
app.use("/api/inngest", (0, express_2.serve)({ client: inngest_1.inngest, functions: inngest_1.functions }));
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
app.listen(env_1.ENV.PORT, () => console.log("port running on", env_1.ENV.PORT));
//# sourceMappingURL=index.js.map