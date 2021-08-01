-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "correctAnswerId" SET DEFAULT E'';
