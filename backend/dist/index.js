"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./lib/env");
const app = (0, express_1.default)();
console.log(env_1.ENV.PORT);
console.log(env_1.ENV.DB_URL);
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "server up and running"
    });
});
app.listen(env_1.ENV.PORT, () => console.log("port running on ", env_1.ENV.PORT));
//# sourceMappingURL=index.js.map