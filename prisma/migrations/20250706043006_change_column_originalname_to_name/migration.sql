/*
  Warnings:

  - You are about to drop the column `originalname` on the `Files` table. All the data in the column will be lost.
  - Added the required column `name` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" DROP COLUMN "originalname",
ADD COLUMN     "name" TEXT NOT NULL;
