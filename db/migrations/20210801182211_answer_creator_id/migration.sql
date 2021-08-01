/*
  Warnings:

  - You are about to drop the column `creator` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `answers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdGames` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `playedGames` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `questions` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "creator",
ADD COLUMN     "creatorId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "answers",
DROP COLUMN "createdGames",
DROP COLUMN "playedGames",
DROP COLUMN "questions",
ADD COLUMN     "createdAnswerIds" TEXT[],
ADD COLUMN     "createdGameIds" TEXT[],
ADD COLUMN     "createdQuestionIds" TEXT[],
ADD COLUMN     "playedGameIds" TEXT[];
