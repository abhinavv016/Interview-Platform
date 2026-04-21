"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleClerkWebhook = handleClerkWebhook;
const inngest_1 = require("./inngest");
async function handleClerkWebhook(req, res) {
    const event = req.body;
    if (event.type === 'clerk/user.created') {
        await inngest_1.inngest.send({
            name: 'clerk/user.created',
            data: event.data,
        });
    }
    return res.status(200).json({ success: true });
}
//# sourceMappingURL=clerk-webhook.js.map