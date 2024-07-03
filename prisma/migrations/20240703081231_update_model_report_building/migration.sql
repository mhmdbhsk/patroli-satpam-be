/*
  Warnings:

  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `floor` to the `ReportBuilding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportBuilding" ADD COLUMN     "floor" TEXT NOT NULL;

-- DropTable
DROP TABLE "VerificationToken";
