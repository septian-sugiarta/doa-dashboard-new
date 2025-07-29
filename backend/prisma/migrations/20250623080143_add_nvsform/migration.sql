-- CreateTable
CREATE TABLE `NvsForm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ncrId` INTEGER NOT NULL,
    `verificationNote` VARCHAR(191) NULL,
    `resultDate` DATETIME(3) NULL,
    `isEffective` BOOLEAN NULL,
    `isReminder` BOOLEAN NULL,
    `verifiedBy` VARCHAR(191) NULL,
    `verifiedDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NvsForm` ADD CONSTRAINT `NvsForm_ncrId_fkey` FOREIGN KEY (`ncrId`) REFERENCES `NcrForm`(`NCR_init_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
