/*
  Warnings:

  - The primary key for the `Answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Answer` table. All the data in the column will be lost.
  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Game` table. All the data in the column will be lost.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Question` table. All the data in the column will be lost.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `userId` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_GameToQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_wrongAnswers` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `id` on the `Answer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_correctAnswerId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropForeignKey
ALTER TABLE "_GameToQuestion" DROP CONSTRAINT "_GameToQuestion_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToQuestion" DROP CONSTRAINT "_GameToQuestion_B_fkey";

-- DropForeignKey
ALTER TABLE "_wrongAnswers" DROP CONSTRAINT "_wrongAnswers_A_fkey";

-- DropForeignKey
ALTER TABLE "_wrongAnswers" DROP CONSTRAINT "_wrongAnswers_B_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_pkey",
DROP COLUMN "userId",
ADD COLUMN     "creator" TEXT,
ADD COLUMN     "questionIds" TEXT[],
ADD COLUMN     "wrongQuestionIds" TEXT[],
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
DROP COLUMN "userId",
ADD COLUMN     "creatorId" TEXT,
ADD COLUMN     "questionIds" TEXT[],
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "userId",
ADD COLUMN     "creatorId" TEXT,
ADD COLUMN     "gameIds" TEXT[],
ADD COLUMN     "wrongAnswerIds" TEXT[],
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "correctAnswerId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Token" DROP CONSTRAINT "Token_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "answers" TEXT[],
ADD COLUMN     "createdGames" TEXT[],
ADD COLUMN     "playedGames" TEXT[],
ADD COLUMN     "questions" TEXT[],
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_GameToQuestion";

-- DropTable
DROP TABLE "_wrongAnswers";

-- AddForeignKey
ALTER TABLE "Session" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
