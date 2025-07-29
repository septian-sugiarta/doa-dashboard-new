/*
  Warnings:

  - You are about to drop the column `noReminder` on the `nvsform` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `nvsform` DROP COLUMN `noReminder`,
    ADD COLUMN `isReminder` BOOLEAN NULL;
