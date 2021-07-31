-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
