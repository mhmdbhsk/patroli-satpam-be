/*
  Warnings:

  - Added the required column `description` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "description" TEXT NOT NULL;
