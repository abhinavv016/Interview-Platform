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
const clerk_webhook_1 = require("./lib/clerk-webhook");
const express_3 = require("@clerk/express");
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: env_1.ENV.CLIENT_URL,
    credentials: true,
}));
app.use((0, express_3.clerkMiddleware)());
app.use("/api/chat", chatRoutes_1.default);
app.post("/webhooks/clerk", clerk_webhook_1.handleClerkWebhook);
app.all("/api/inngest", (0, express_2.serve)({ client: inngest_1.inngest, functions: inngest_1.functions }));
app.get("/health", (_req, res) => {
    res.status(200).json({
        msg: "health endpoint is up and running",
    });
});
app.listen(env_1.ENV.PORT, () => console.log("port running on", env_1.ENV.PORT));
//# sourceMappingURL=index.js.map