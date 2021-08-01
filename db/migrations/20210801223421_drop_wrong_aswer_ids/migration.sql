/*
  Warnings:

  - You are about to drop the column `wrongAnswerIds` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "wrongAnswerIds",
ADD COLUMN     "answerIds" TEXT[];
