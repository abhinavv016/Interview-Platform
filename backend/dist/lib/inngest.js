"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = exports.inngest = void 0;
const inngest_1 = require("inngest");
const prisma_1 = __importDefault(require("./prisma"));
const env_1 = require("./env");
const stream_1 = require("./stream");
exports.inngest = new inngest_1.Inngest({
    id: "intervueX",
    baseUrl: env_1.ENV.INNGEST_BASE_URL || "http://localhost:8288",
});
const syncUser = exports.inngest.createFunction({ id: "sync-user" }, { event: "clerk/user.created" }, async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const newUser = {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`,
        profileImage: image_url
    };
    await prisma_1.default.user.create({
        data: newUser,
    });
    await (0, stream_1.upsertStreamUser)({
        id: newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.profileImage
    });
});
const deleteUser = exports.inngest.createFunction({ id: "delete-user-from-db" }, { event: "clerk/user.deleted" }, async ({ event }) => {
    const { id } = event.data;
    await prisma_1.default.user.delete({
        where: { clerkId: id, },
    });
    await (0, stream_1.deleteStreamUser)(id.toString());
});
exports.functions = [syncUser, deleteUser];
//# sourceMappingURL=inngest.js.map