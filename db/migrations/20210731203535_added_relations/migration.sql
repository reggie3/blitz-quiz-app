-- CreateTable
CREATE TABLE "_wrongAnswers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_wrongAnswers_AB_unique" ON "_wrongAnswers"("A", "B");

-- CreateIndex
CREATE INDEX "_wrongAnswers_B_index" ON "_wrongAnswers"("B");

-- AddForeignKey
ALTER TABLE "_wrongAnswers" ADD FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wrongAnswers" ADD FOREIGN KEY ("B") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
