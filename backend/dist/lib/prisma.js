"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../node_modules/.prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const env_1 = require("./env");
const globalForPrisma = global;
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: env_1.ENV.DATABASE_URL,
});
const prisma = globalForPrisma.prisma ||
    new client_1.PrismaClient({
        adapter,
        log: env_1.ENV.NODE_ENV === "development" ? ["query"] : [],
    });
if (env_1.ENV.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
exports.default = prisma;
//# sourceMappingURL=prisma.js.map