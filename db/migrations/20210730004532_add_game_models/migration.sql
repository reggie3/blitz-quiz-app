/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `wrongAnswers` on the `Question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[answerId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answerId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "questionId" INTEGER;

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctAnswer",
DROP COLUMN "wrongAnswers",
ADD COLUMN     "answerId" INTEGER NOT NULL,
ADD COLUMN     "gameId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Question_answerId_unique" ON "Question"("answerId");

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
