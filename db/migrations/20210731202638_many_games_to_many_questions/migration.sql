/*
  Warnings:

  - You are about to drop the column `questionId` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `answerId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_answerId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_gameId_fkey";

-- DropIndex
DROP INDEX "Question_answerId_unique";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "questionId";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answerId",
DROP COLUMN "gameId";

-- CreateTable
CREATE TABLE "_GameToQuestion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToQuestion_AB_unique" ON "_GameToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToQuestion_B_index" ON "_GameToQuestion"("B");

-- AddForeignKey
ALTER TABLE "_GameToQuestion" ADD FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToQuestion" ADD FOREIGN KEY ("B") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
