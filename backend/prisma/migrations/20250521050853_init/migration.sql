-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_number` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NcrForm` (
    `NCR_init_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `RegulationBased` VARCHAR(191) NOT NULL,
    `Subject` VARCHAR(191) NOT NULL,
    `Audit_Plan_No` VARCHAR(191) NOT NULL,
    `NCR_nbr` VARCHAR(191) NOT NULL,
    `Issued_date` DATETIME(3) NOT NULL,
    `Responsible_Office` VARCHAR(191) NOT NULL,
    `times_occurred` VARCHAR(191) NOT NULL,
    `Audit_Type` VARCHAR(191) NOT NULL,
    `Audit_scope` VARCHAR(191) NOT NULL,
    `To_UIC` VARCHAR(191) NOT NULL,
    `Attention` VARCHAR(191) NOT NULL,
    `Required_condition_reff` VARCHAR(191) NOT NULL,
    `Level_of_Finding` VARCHAR(191) NOT NULL,
    `implementation_date` DATETIME(3) NOT NULL,
    `Problem_Analysis` VARCHAR(191) NOT NULL,
    `Answer_due_date` DATETIME(3) NOT NULL,
    `Issue_IAN` VARCHAR(191) NOT NULL,
    `IAN_nbr` VARCHAR(191) NOT NULL,
    `Encountered_Condition` VARCHAR(191) NOT NULL,
    `Audited_by` VARCHAR(191) NOT NULL,
    `Audit_Date` DATETIME(3) NOT NULL,
    `Acknowledge_by` VARCHAR(191) NOT NULL,
    `Acknowledge_date` DATETIME(3) NOT NULL,
    `Status` VARCHAR(191) NOT NULL,
    `Remark` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ncrformStatus` VARCHAR(191) NOT NULL DEFAULT 'Reply',

    PRIMARY KEY (`NCR_init_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NcrReply` (
    `ncrReply_id` INTEGER NOT NULL AUTO_INCREMENT,
    `RCA_problem` VARCHAR(191) NOT NULL,
    `Corrective_Action` VARCHAR(191) NOT NULL,
    `Preventive_Action` VARCHAR(191) NOT NULL,
    `Recommend_corrective_action` VARCHAR(191) NOT NULL,
    `Identified_by_Auditee` VARCHAR(191) NOT NULL,
    `Identified_Date` DATETIME(3) NOT NULL,
    `Accept_by_Auditor` VARCHAR(191) NOT NULL,
    `Auditor_Accept_date` DATETIME(3) NOT NULL,
    `implementationReply_date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ncrreplyStatus` VARCHAR(191) NOT NULL DEFAULT 'Follow Result',
    `ncrId` INTEGER NOT NULL,

    PRIMARY KEY (`ncrReply_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NcrFollowResult` (
    `ncrFollowResult_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Close_Corrective_Actions` VARCHAR(191) NOT NULL,
    `Proposed_Close_Auditee` VARCHAR(191) NOT NULL,
    `Proposed_Close_Date` DATETIME(3) NOT NULL,
    `Implemented_close_date` DATETIME(3) NOT NULL,
    `Is_close` VARCHAR(191) NOT NULL,
    `effectiveness` VARCHAR(191) NOT NULL,
    `Refer_to_Verify_Sheet` VARCHAR(191) NOT NULL,
    `Sheet_No` VARCHAR(191) NOT NULL,
    `New_NCR_Issue_nbr` VARCHAR(191) NOT NULL,
    `Close_approved_by` VARCHAR(191) NOT NULL,
    `Close_approved_date` DATETIME(3) NOT NULL,
    `Verified_Chief_IM` VARCHAR(191) NOT NULL,
    `Verified_Date` DATETIME(3) NOT NULL,
    `followup_audit_result` VARCHAR(191) NOT NULL,
    `evidence` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ncrfollowresultStatus` VARCHAR(191) NOT NULL DEFAULT 'Finish',
    `ncrId` INTEGER NOT NULL,
    `ncrReplyId` INTEGER NOT NULL,

    PRIMARY KEY (`ncrFollowResult_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IorForm` (
    `id_IOR` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_ior` VARCHAR(191) NOT NULL,
    `occur_nbr` VARCHAR(191) NOT NULL,
    `occur_date` DATETIME(3) NOT NULL,
    `reference_ior` VARCHAR(191) NOT NULL,
    `to_uic` VARCHAR(191) NOT NULL,
    `cc_uic` VARCHAR(191) NOT NULL,
    `category_occur` VARCHAR(191) NOT NULL,
    `type_or_pnbr` VARCHAR(191) NOT NULL,
    `level_type` VARCHAR(191) NOT NULL,
    `detail_occurance` VARCHAR(191) NOT NULL,
    `Reportedby` VARCHAR(191) NOT NULL,
    `reporter_uic` VARCHAR(191) NOT NULL,
    `report_date` DATETIME(3) NOT NULL,
    `reporter_identity` VARCHAR(191) NOT NULL,
    `data_reference` VARCHAR(191) NOT NULL,
    `hirac_process` VARCHAR(191) NOT NULL,
    `Initial_probability` VARCHAR(191) NOT NULL,
    `initial_severity` VARCHAR(191) NOT NULL,
    `initial_riskindex` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iorformStatus` VARCHAR(191) NOT NULL DEFAULT 'Follow On',

    PRIMARY KEY (`id_IOR`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IorFollowOn` (
    `iorFollowOn_id` INTEGER NOT NULL AUTO_INCREMENT,
    `follup_detail` VARCHAR(191) NOT NULL,
    `follupby` VARCHAR(191) NOT NULL,
    `follup_uic` VARCHAR(191) NOT NULL,
    `follup_date` DATETIME(3) NOT NULL,
    `follup_datarefer` VARCHAR(191) NOT NULL,
    `follup_status` VARCHAR(191) NOT NULL,
    `nextuic_follup` VARCHAR(191) NOT NULL,
    `current_probability` VARCHAR(191) NOT NULL,
    `current_severity` VARCHAR(191) NOT NULL,
    `current_riskindex` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iorfollowonStatus` VARCHAR(191) NOT NULL DEFAULT 'Finish',
    `iorId` INTEGER NOT NULL,

    PRIMARY KEY (`iorFollowOn_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActionLog` (
    `actionLog_id` INTEGER NOT NULL AUTO_INCREMENT,
    `regulation_based` VARCHAR(191) NOT NULL,
    `action_nbr` VARCHAR(191) NOT NULL,
    `reference_PACLR_nbr` VARCHAR(191) NOT NULL,
    `issued_date` DATETIME(3) NOT NULL,
    `action_description` VARCHAR(191) NOT NULL,
    `audit_area` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `implementationAction_date` DATETIME(3) NOT NULL,
    `evidence` VARCHAR(191) NOT NULL,
    `close_date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`actionLog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditStatusLog` (
    `auditStatusLog_id` INTEGER NOT NULL AUTO_INCREMENT,
    `regulation_based` VARCHAR(191) NOT NULL,
    `doc_nbr` VARCHAR(191) NOT NULL,
    `statusLog_date` DATETIME(3) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `reason_of_issuance` VARCHAR(191) NOT NULL,
    `prepared_by` VARCHAR(191) NOT NULL,
    `prepared_date` DATETIME(3) NOT NULL,
    `checked_by` VARCHAR(191) NOT NULL,
    `checked_date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`auditStatusLog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NcrReply` ADD CONSTRAINT `NcrReply_ncrId_fkey` FOREIGN KEY (`ncrId`) REFERENCES `NcrForm`(`NCR_init_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NcrFollowResult` ADD CONSTRAINT `NcrFollowResult_ncrId_fkey` FOREIGN KEY (`ncrId`) REFERENCES `NcrForm`(`NCR_init_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NcrFollowResult` ADD CONSTRAINT `NcrFollowResult_ncrReplyId_fkey` FOREIGN KEY (`ncrReplyId`) REFERENCES `NcrReply`(`ncrReply_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IorFollowOn` ADD CONSTRAINT `IorFollowOn_iorId_fkey` FOREIGN KEY (`iorId`) REFERENCES `IorForm`(`id_IOR`) ON DELETE CASCADE ON UPDATE CASCADE;
