"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./lib/env");
dotenv_1.default.config({
    path: path_1.default.resolve(process.cwd(), "backend/.env")
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Server running 🚀");
});
const PORT = Number(process.env.PORT) || 5030;
const rootDir = process.cwd();
if (env_1.ENV.NODE_ENV === "production") {
    const frontendPath = path_1.default.join(rootDir, "frontend", "dist");
    app.use(express_1.default.static(frontendPath));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path_1.default.join(frontendPath, "index.html"));
    });
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map