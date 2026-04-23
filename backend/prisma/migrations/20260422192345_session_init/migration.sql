-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'COMPLETED');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "hostId" TEXT NOT NULL,
    "participantId" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "callId" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
