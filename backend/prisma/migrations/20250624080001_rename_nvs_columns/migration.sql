/*
  Warnings:

  - You are about to drop the column `is_effective` on the `nvsform` table. All the data in the column will be lost.
  - You are about to drop the column `no_reminder` on the `nvsform` table. All the data in the column will be lost.
  - You are about to drop the column `result_date` on the `nvsform` table. All the data in the column will be lost.
  - You are about to drop the column `verified_by` on the `nvsform` table. All the data in the column will be lost.
  - You are about to drop the column `verified_date` on the `nvsform` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `nvsform` DROP COLUMN `is_effective`,
    DROP COLUMN `no_reminder`,
    DROP COLUMN `result_date`,
    DROP COLUMN `verified_by`,
    DROP COLUMN `verified_date`,
    ADD COLUMN `isEffective` BOOLEAN NULL,
    ADD COLUMN `noReminder` BOOLEAN NULL,
    ADD COLUMN `resultDate` DATETIME(3) NULL,
    ADD COLUMN `verifiedBy` VARCHAR(191) NULL,
    ADD COLUMN `verifiedDate` DATETIME(3) NULL;
