/*
  Warnings:

  - Added the required column `correctAnswerId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "correctAnswerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD FOREIGN KEY ("correctAnswerId") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
