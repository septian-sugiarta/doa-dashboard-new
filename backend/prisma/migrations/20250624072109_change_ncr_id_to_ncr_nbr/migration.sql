/*
  Warnings:

  - You are about to drop the column `isEffective` on the `nvsform` table. All the data in the column will be lost.
  - You are about to drop the column `isReminder` on the `nvsform` table. All the data in the column will be lost.
  - You are about to drop the column `resultDate` on the `nvsform` table. All the data in the column will be lost.
  - You are about to drop the column `verifiedBy` on the `nvsform` table. All the data in the column will be lost.
  - You are about to drop the column `verifiedDate` on the `nvsform` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `nvsform` DROP COLUMN `isEffective`,
    DROP COLUMN `isReminder`,
    DROP COLUMN `resultDate`,
    DROP COLUMN `verifiedBy`,
    DROP COLUMN `verifiedDate`,
    ADD COLUMN `is_effective` BOOLEAN NULL,
    ADD COLUMN `no_reminder` BOOLEAN NULL,
    ADD COLUMN `result_date` DATETIME(3) NULL,
    ADD COLUMN `verified_by` VARCHAR(191) NULL,
    ADD COLUMN `verified_date` DATETIME(3) NULL;
