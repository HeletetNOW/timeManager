/*
  Warnings:

  - You are about to drop the `_ProjectToTimer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToTimer" DROP CONSTRAINT "_ProjectToTimer_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTimer" DROP CONSTRAINT "_ProjectToTimer_B_fkey";

-- DropTable
DROP TABLE "_ProjectToTimer";

-- CreateTable
CREATE TABLE "_SubProjectToTimer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SubProjectToTimer_AB_unique" ON "_SubProjectToTimer"("A", "B");

-- CreateIndex
CREATE INDEX "_SubProjectToTimer_B_index" ON "_SubProjectToTimer"("B");

-- AddForeignKey
ALTER TABLE "_SubProjectToTimer" ADD CONSTRAINT "_SubProjectToTimer_A_fkey" FOREIGN KEY ("A") REFERENCES "SubProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubProjectToTimer" ADD CONSTRAINT "_SubProjectToTimer_B_fkey" FOREIGN KEY ("B") REFERENCES "Timer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
