import { PrismaClient } from "../../node_modules/.prisma/client";

import { PrismaPg } from '@prisma/adapter-pg';
import { ENV } from "./env";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaPg({
  connectionString: ENV.DATABASE_URL!,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ 
    adapter,
    log: ENV.NODE_ENV === "development" ? ["query"] : [],
  });

if (ENV.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;