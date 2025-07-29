import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SourceCode } from 'eslint';
import { PrismaService } from 'src/prisma/prisma.service';

// interface CreateAuditPlanDto {
//     doc_no: number;
//     doc_date: Date;
//     subject: string;
//     audit_type: string;
// }

// interface UpdateAuditPlanDto {
//     doc_no?: number;
//     doc_date?: Date;
//     subject?: string;
//     audit_type?: string;
// }

// interface CreateAPdetailDto {
//     no_item: number;
//     requirement: string;
//     work_station: string;
//     planned_week: number;
//     actual_visit_date: Date;
//     auditReportEvidenceNbr: string;
//     auditPlanId: number; // foreign key yang merujuk ke AuditPlan
// }

// interface UpdateAPdetailDto {
//     no_item?: number;
//     requirement?: string;
//     work_station?: string;
//     planned_week?: number;
//     actual_visit_date?: Date;
//     auditReportEvidenceNbr?: string;
//     auditPlanId?: number; // foreign key yang merujuk ke AuditPlan
// }

// interface CreateIssuenceDto {
//     issueNbr: number;
//     issueDate: Date;
//     issueDesc: string;
//     issueBy: string;
//     HDOapprove: string;
// }

// interface UpdateIssuenceDto {
//     issueNbr?: number;
//     issueDate?: Date;
//     issueDesc?: string;
//     issueBy?: string;
//     HDOapprove?: string;
// }

// interface CreateFindingIdentificationDto {
//     Organisation_name: string;
//     DOA_No: string;
//     DOA_Core_Process: string;
//     Key_Subject: string;
//     Handbook_Procedure: string;
//     Finding_No: string;
//     Part_21: string;
//     Initial_Deadline: Date;
//     Current_Deadline: Date;
//     Level: string;
//     Status: string;
//     Finding: string;
//     Notes: string;
//     Evidence_references: string;
//     Name: string;
//     Position: string;
//     Date_of_notification: Date;
//     DOA_Holder_Focal_Point_Email: string;
//     issuence_id: number; // foreign key yang merujuk ke Issuence
// }

// interface UpdateFindingIdentificationDto {
//     Organisation_name?: string;
//     DOA_No?: string;
//     DOA_Core_Process?: string;
//     Key_Subject?: string;
//     Handbook_Procedure?: string;
//     Finding_No?: string;
//     Part_21?: string;
//     Initial_Deadline?: Date;
//     Current_Deadline?: Date;
//     Level?: string;
//     Status?: string;
//     Finding?: string;
//     Notes?: string;
//     Evidence_references?: string;
//     Name?: string;
//     Position?: string;
//     Date_of_notification?: Date;
//     DOA_Holder_Focal_Point_Email?: string;
//     issuence_id?: number; // foreign key yang merujuk ke Issuence
// }

// interface CreateFindingClosure_LogEventsDto {
//     Date_log: Date;
//     Description_type: string;
//     Description_text: string;
//     finding_identification_id: number; // foreign key yang merujuk ke FindingIdentification
// }

// interface UpdateFindingClosure_LogEventsDto {
//     Date_log?: Date;
//     Description_type?: string;
//     Description_text?: string;
//     finding_identification_id?: number; // foreign key yang merujuk ke FindingIdentification
// }

// interface CreateFindingClosure_RootCause_ExtensionsDto {
//     Item: string;
//     DOA_holder_date_comment: string;
//     DOA_holder_describe: string;
//     EASA_response_date: Date;
//     EASA_response: string;
//     finding_identification_id: number; // foreign key yang merujuk ke FindingIdentification
// }

// interface UpdateFindingClosure_RootCause_ExtensionsDto {
//     Item?: string;
//     DOA_holder_date_comment?: string;
//     DOA_holder_describe?: string;
//     EASA_response_date?: Date;
//     EASA_response?: string;
//     finding_identification_id?: number; // foreign key yang merujuk ke FindingIdentification
// }

// interface CreateFindingClosureCorrectiveActionPlanDto {
//     item: string;
//     DOA_holder_date_comment: string;
//     DOA_holder_describe: string;
//     EASA_response_date: Date;
//     EASA_feedback: string;
//     finding_identification_id: number; // foreign key yang merujuk ke FindingIdentification
// }

// interface UpdateFindingClosureCorrectiveActionPlanDto {
//     item?: string;
//     DOA_holder_date_comment?: string;
//     DOA_holder_describe?: string;
//     EASA_response_date?: Date;
//     EASA_feedback?: string;
//     finding_identification_id?: number; // foreign key yang merujuk ke FindingIdentification
// }

// interface CreateFindingClosureClosingTheFindingDto {
//     item: string;
//     DOA_holder_date_comment: string;
//     DOA_holder_describe: string;
//     EASA_response_date: Date;
//     EASA_response: string;
//     finding_identification_id: number; // foreign key yang merujuk ke FindingIdentification
// }

// interface UpdateFindingClosureClosingTheFindingDto {
//     item?: string;
//     DOA_holder_date_comment?: string;
//     DOA_holder_describe?: string;
//     EASA_response_date?: Date;
//     EASA_response?: string;
//     finding_identification_id?: number; // foreign key yang merujuk ke FindingIdentification
// }

// interface CreateClosureAndPerformanceDto {
//     closure: string;
//     No_of_extention: string;
//     was_the_finding_overdue: string;
//     finding_identification_id: number; // foreign key yang merujuk ke FindingIdentification
// }

// interface UpdateClosureAndPerformanceDto {
//     closure?: string;
//     No_of_extention?: string;
//     was_the_finding_overdue?: string;
//     finding_identification_id?: number; // foreign key yang merujuk ke FindingIdentification
// }

@Injectable()
export class AuditPlanService {
    // constructor(private readonly prismaService: PrismaService) { }

    // async createAuditPlan(data: CreateAuditPlanDto) {
    //     try {
    //         const auditPlan = await this.prismaService.auditPlan.create({
    //             data: {
    //                 doc_no: Number(data.doc_no),
    //                 doc_date: new Date(data.doc_date),
    //                 subject: data.subject,
    //                 audit_type: data.audit_type,
    //             },
    //         });
    //         return auditPlan;
    //     } catch (error) {
    //         console.error('Error creating Audit Plan:', error);
    //         throw error;
    //     }
    // }

    // async getAuditPlans(keyword?: string) {
    //     if (keyword) {
    //         const parsedDate = new Date(keyword);
    //         const isValidDate = !isNaN(parsedDate.getTime());

    //         return await this.prismaService.auditPlan.findMany({
    //             where: {
    //                 OR: [
    //                     {
    //                         doc_no: {
    //                             equals: Number(keyword),
    //                         },
    //                     },
    //                     {
    //                         subject: {
    //                             contains: keyword,
    //                         },
    //                     },
    //                     {
    //                         audit_type: {
    //                             contains: keyword,
    //                         },
    //                     },
    //                     ...(isValidDate
    //                         ? [
    //                             {
    //                                 doc_date: parsedDate,
    //                             },
    //                         ]
    //                         : []),
    //                 ],
    //             },
    //         });
    //     }
    //     return await this.prismaService.auditPlan.findMany();

    // } catch(error) {
    //     console.error('Error fetching Audit Plans:', error);
    //     throw error;
    // }

    // async getAuditPlan(id_audit_plan: string) {
    //     try {
    //         return await this.prismaService.auditPlan.findUnique({
    //             where: {
    //                 id_audit_plan: +id_audit_plan, // Convert string to number
    //             },
    //         });
    //     } catch (error) {
    //         console.error('Error fetching Audit Plan:', error);
    //         throw error;
    //     }
    // }

    // async updateAuditPlan(id_audit_plan: string, data: UpdateAuditPlanDto) {
    //     try {
    //         return await this.prismaService.auditPlan.update({
    //             where: {
    //                 id_audit_plan: +id_audit_plan,
    //             },
    //             data: {
    //                 ...data,
    //             },
    //         });
    //     } catch (error) {
    //         console.error('Error updating Audit Plan:', error);
    //         throw error;
    //     }
    // }
    // async deleteAuditPlan(id_audit_plan: number) {
    //     try {
    //         const auditPlan = await this.prismaService.auditPlan.findUnique({
    //             where: {
    //                 id_audit_plan: id_audit_plan,
    //             },
    //         });
    //         if (!auditPlan) {
    //             throw new Error('Audit Plan not found');
    //         }
    //         return await this.prismaService.auditPlan.delete({
    //             where: {
    //                 id_audit_plan: id_audit_plan,
    //             },
    //         });
    //     } catch (error) {
    //         console.error('Error deleting Audit Plan:', error);
    //         throw error;
    //     }
    // }


    // async createAPdetail(data: CreateAPdetailDto) {
    //     try {
    //         const apDetail = await this.prismaService.aPdetail.findUnique({
    //             where: {
    //                 id_ap_detail: data.auditPlanId,
    //             },
    //         });
    //         if (!apDetail) {
    //             throw new HttpException('APdetail not found', HttpStatus.NOT_FOUND);
    //         }

    //         const newAPdetail = await this.prismaService.aPdetail.create({
    //             data: {
    //                 no_item: Number(data.no_item),
    //                 requirement: data.requirement,
    //                 work_station: data.work_station,
    //                 planned_week: data.planned_week,
    //                 actual_visit_date: new Date(data.actual_visit_date),
    //                 auditReportEvidenceNbr: data.auditReportEvidenceNbr,
    //                 auditPlanId: data.auditPlanId, // foreign key yang merujuk ke AuditPlan
    //             },
    //         });
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error creating APdetail', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async getAPdetails() {
    //     try {
    //         return await this.prismaService.aPdetail.findMany();
    //     } catch (error) {
    //         throw new HttpException('Error fetching APdetails', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async getAPdetail(id_ap_detail: string) {
    //     try {
    //         const apDetail = await this.prismaService.aPdetail.findUnique({
    //             where: {
    //                 id_ap_detail: +id_ap_detail,  // Convert string to number
    //             },
    //         });

    //         if (!apDetail) {
    //             throw new HttpException('APdetail not found', HttpStatus.NOT_FOUND);
    //         }

    //         return apDetail;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error fetching APdetail', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async updateAPdetail(id_ap_detail: string, data: UpdateAPdetailDto) {
    //     try {
    //         const aPDetailExists = await this.prismaService.aPdetail.findUnique({
    //             where: {
    //                 id_ap_detail: +id_ap_detail,
    //             }
    //         });

    //         if (!aPDetailExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         if (data.auditPlanId) {
    //             const auditPlanExists = await this.prismaService.auditPlan.findUnique({
    //                 where: {
    //                     id_audit_plan: data.auditPlanId,
    //                 }
    //             });

    //             if (!auditPlanExists) {
    //                 throw new HttpException('Audit Plan not found', HttpStatus.NOT_FOUND)
    //             }
    //         }

    //         const updatedAPdetail = await this.prismaService.aPdetail.update({
    //             where: {
    //                 id_ap_detail: +id_ap_detail,
    //             },
    //             data: {
    //                 ...data,
    //             },
    //         });
    //         return updatedAPdetail;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error updating ap detail', HttpStatus.BAD_REQUEST)
    //     }
    // }

    // async deleteAPdetail(id_ap_detail: string) {
    //     try {
    //         const aPDetailExists = await this.prismaService.aPdetail.findUnique({
    //             where: {
    //                 id_ap_detail: +id_ap_detail,
    //             },
    //         });

    //         if (!aPDetailExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         await this.prismaService.aPdetail.delete({
    //             where: {
    //                 id_ap_detail: +id_ap_detail
    //             },
    //         });

    //         return { success: true }
    //     } catch (error) {
    //         throw new HttpException(error.message || "Error deleting", HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }

    // async createIssuence(data: CreateIssuenceDto) {
    //     try {
    //         const Issuence = await this.prismaService.issuence.create({
    //             data: {

    //                 issueNbr: Number(data.issueNbr),
    //                 issueDate: new Date(data.issueDate),
    //                 issueDesc: data.issueDesc,
    //                 issueBy: data.issueBy,
    //                 HDOapprove: data.HDOapprove
    //             },
    //         });
    //         return Issuence;
    //     } catch (error) {
    //         console.error('error creating issuence', error);
    //         throw error;
    //     }
    // }

    // async getIssuences() {
    //     try {
    //         return await this.prismaService.issuence.findMany();
    //     } catch (error) {
    //         throw new HttpException('Error fetching issuences', HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }

    // async getIssuence(id_issuence: string) {
    //     try {
    //         return await this.prismaService.issuence.findUnique({
    //             where: {
    //                 id_issuence: +id_issuence,
    //             },
    //         });
    //     } catch (error) {
    //         console.error('Error fetching NcrForm:', error);
    //         throw error;
    //     }
    // }

    // async updateIssuence(id_issuence: string, data: CreateIssuenceDto) {
    //     try {
    //         return await this.prismaService.issuence.update({
    //             where: {
    //                 id_issuence: +id_issuence,
    //             },
    //             data: {
    //                 ...data,
    //             },
    //         });
    //     } catch (error) {
    //         console.error('Error updating NcrForm:', error);
    //         throw error;
    //     }
    // }

    // async deleteIssuence(id_issuence: number) {
    //     try {
    //         const issuence = await this.prismaService.issuence.findUnique({
    //             where: {
    //                 id_issuence: id_issuence,
    //             },
    //         });

    //         if (!issuence) {
    //             throw new Error('issuence not found');
    //         }

    //         // Hapus issuence jika ada
    //         return await this.prismaService.issuence.delete({
    //             where: {
    //                 id_issuence: id_issuence,
    //             },
    //         });
    //     } catch (error) {
    //         console.error('Error deleting issuence:', error);
    //         throw error;
    //     }
    // }



    // async createFindingIdentification(data: CreateFindingIdentificationDto) {
    //     try {
    //         const FindingIdentification = await this.prismaService.findingIdentification.findUnique({
    //             where: {
    //                 id_finding_identification: data.issuence_id,
    //             },
    //         });
    //         if (!FindingIdentification) {
    //             throw new HttpException('findingIdentification not found', HttpStatus.NOT_FOUND);
    //         }

    //         const newfindingIdentification = await this.prismaService.findingIdentification.create({
    //             data: {
    //                 Organisation_name: data.Organisation_name,
    //                 DOA_No: data.DOA_No,
    //                 DOA_Core_Process: data.DOA_Core_Process,
    //                 Key_Subject: data.Key_Subject,
    //                 Handbook_Procedure: data.Handbook_Procedure,
    //                 Finding_No: data.Finding_No,
    //                 Part_21: data.Part_21,
    //                 Initial_Deadline: new Date(data.Initial_Deadline),
    //                 Current_Deadline: new Date(data.Current_Deadline),
    //                 Level: data.Level,
    //                 Status: data.Status,
    //                 Finding: data.Finding,
    //                 Notes: data.Notes,
    //                 Evidence_references: data.Evidence_references,
    //                 Name: data.Name,
    //                 Position: data.Position,
    //                 Date_of_notification: new Date(data.Date_of_notification),
    //                 DOA_Holder_Focal_Point_Email: data.DOA_Holder_Focal_Point_Email,
    //                 issuence_id: data.issuence_id
    //             },
    //         });
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error creating APdetail', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async getFindingIdentifications() {
    //     try {
    //         return await this.prismaService.findingIdentification.findMany();
    //     } catch (error) {
    //         throw new HttpException('Error fetching findingIdentifications', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async getFindingIdentification(id_finding_identification: string) {
    //     try {
    //         const FindingIdentification = await this.prismaService.findingIdentification.findUnique({
    //             where: {
    //                 id_finding_identification: +id_finding_identification,  // Convert string to number
    //             },
    //         });

    //         if (!FindingIdentification) {
    //             throw new HttpException('APdetail not found', HttpStatus.NOT_FOUND);
    //         }

    //         return FindingIdentification;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error fetching APdetail', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async updateFindingIdentification(id_finding_identification: string, data: UpdateFindingIdentificationDto) {
    //     try {
    //         const findingIdentificationExists = await this.prismaService.findingIdentification.findUnique({
    //             where: {
    //                 id_finding_identification: +id_finding_identification,
    //             }
    //         });

    //         if (!findingIdentificationExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         if (data.issuence_id) {
    //             const issuenceExists = await this.prismaService.issuence.findUnique({
    //                 where: {
    //                     id_issuence: data.issuence_id,
    //                 }
    //             });

    //             if (!issuenceExists) {
    //                 throw new HttpException('Audit Plan not found', HttpStatus.NOT_FOUND)
    //             }
    //         }

    //         const updatedfindingIdentification = await this.prismaService.findingIdentification.update({
    //             where: {
    //                 id_finding_identification: +id_finding_identification,
    //             },
    //             data: {
    //                 ...data,
    //             },
    //         });
    //         return updatedfindingIdentification;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error updating ap detail', HttpStatus.BAD_REQUEST)
    //     }
    // }

    // async deleteFindingIdentification(id_finding_identification: string) {
    //     try {
    //         const findingIdentificationExists = await this.prismaService.findingIdentification.findUnique({
    //             where: {
    //                 id_finding_identification: +id_finding_identification,
    //             },
    //         });

    //         if (!findingIdentificationExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         await this.prismaService.findingIdentification.delete({
    //             where: {
    //                 id_finding_identification: +id_finding_identification
    //             },
    //         });

    //         return { success: true }
    //     } catch (error) {
    //         throw new HttpException(error.message || "Error deleting", HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }



    // async createFindingClosure_LogEvents(data: CreateFindingClosure_LogEventsDto) {
    //     try {
    //         const FindingClosure_LogEvents = await this.prismaService.findingClosure_LogEvents.findUnique({
    //             where: {
    //                 id_finding_closure_log_events: data.finding_identification_id,
    //             },
    //         });
    //         if (!FindingClosure_LogEvents) {
    //             throw new HttpException('FindingClosure_LogEvents not found', HttpStatus.NOT_FOUND);
    //         }

    //         const newFindingClosure_LogEvents = await this.prismaService.findingClosure_LogEvents.create({
    //             data: {
    //                 Date_log: new Date(data.Date_log),
    //                 Description_type: data.Description_type,
    //                 Description_text: data.Description_text,
    //                 finding_identification_id: data.finding_identification_id
    //             },
    //         });
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error creating APdetail', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async getFindingClosure_LogEventss() {
    //     try {
    //         return await this.prismaService.findingClosure_LogEvents.findMany();
    //     } catch (error) {
    //         throw new HttpException('Error fetching FindingClosure_LogEventss', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async getFindingClosure_LogEvents(id_finding_closure_log_events: string) {
    //     try {
    //         const FindingClosure_LogEvents = await this.prismaService.findingClosure_LogEvents.findUnique({
    //             where: {
    //                 id_finding_closure_log_events: + id_finding_closure_log_events,  // Convert string to number
    //             },
    //         });

    //         if (!FindingClosure_LogEvents) {
    //             throw new HttpException('APdetail not found', HttpStatus.NOT_FOUND);
    //         }

    //         return FindingClosure_LogEvents;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error fetching APdetail', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async updateFindingClosure_LogEvents(id_finding_closure_log_events: string, data: UpdateFindingClosure_LogEventsDto) {
    //     try {
    //         const FindingClosure_LogEventsExists = await this.prismaService.findingClosure_LogEvents.findUnique({
    //             where: {
    //                 id_finding_closure_log_events: + id_finding_closure_log_events,
    //             }
    //         });

    //         if (!FindingClosure_LogEventsExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         if (data.finding_identification_id) {
    //             const FindingIdentificationExists = await this.prismaService.findingIdentification.findUnique({
    //                 where: {
    //                     id_finding_identification: data.finding_identification_id,
    //                 }
    //             });

    //             if (!FindingIdentificationExists) {
    //                 throw new HttpException('Audit Plan not found', HttpStatus.NOT_FOUND)
    //             }
    //         }

    //         const updatedFindingClosure_LogEvents = await this.prismaService.findingClosure_LogEvents.update({
    //             where: {
    //                 id_finding_closure_log_events: + id_finding_closure_log_events,
    //             },
    //             data: {
    //                 ...data,
    //             },
    //         });
    //         return updatedFindingClosure_LogEvents;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error updating ap detail', HttpStatus.BAD_REQUEST)
    //     }
    // }

    // async deleteFindingClosure_LogEvents(id_finding_closure_log_events: string) {
    //     try {
    //         const FindingClosure_LogEventsExists = await this.prismaService.findingClosure_LogEvents.findUnique({
    //             where: {
    //                 id_finding_closure_log_events: + id_finding_closure_log_events,
    //             },
    //         });

    //         if (!FindingClosure_LogEventsExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         await this.prismaService.findingClosure_LogEvents.delete({
    //             where: {
    //                 id_finding_closure_log_events: + id_finding_closure_log_events
    //             },
    //         });

    //         return { success: true }
    //     } catch (error) {
    //         throw new HttpException(error.message || "Error deleting", HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }

    // async createFindingClosure_RootCause_Extensions(data: CreateFindingClosure_RootCause_ExtensionsDto) {
    //     try {
    //         const FindingClosure_RootCause_Extensions = await this.prismaService.findingClosure_RootCause_Extensions.findUnique({
    //             where: {
    //                 id_finding_closure_root_cause_extensions: data.finding_identification_id,
    //             },
    //         });
    //         if (!FindingClosure_RootCause_Extensions) {
    //             throw new HttpException('FindingClosure_RootCause_Extensions not found', HttpStatus.NOT_FOUND);
    //         }

    //         const newFindingClosure_RootCause_Extensions = await this.prismaService.findingClosure_RootCause_Extensions.create({
    //             data: {
    //                 Item: data.Item,
    //                 DOA_holder_date_comment: data.DOA_holder_date_comment,
    //                 DOA_holder_describe: data.DOA_holder_describe,
    //                 EASA_response_date: new Date(data.EASA_response_date),
    //                 EASA_response: data.EASA_response,
    //                 finding_identification_id: data.finding_identification_id
    //             },
    //         });
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error creating APdetail', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async getFindingClosure_RootCause_Extensionss() {
    //     try {
    //         return await this.prismaService.findingClosure_RootCause_Extensions.findMany();
    //     } catch (error) {
    //         throw new HttpException('Error fetching FindingClosure_RootCause_Extensionss', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async getFindingClosure_RootCause_Extensions(id_finding_closure_root_cause_extensions: string) {
    //     try {
    //         const FindingClosure_RootCause_Extensions = await this.prismaService.findingClosure_RootCause_Extensions.findUnique({
    //             where: {
    //                 id_finding_closure_root_cause_extensions: +  id_finding_closure_root_cause_extensions,  // Convert string to number
    //             },
    //         });

    //         if (!FindingClosure_RootCause_Extensions) {
    //             throw new HttpException('APdetail not found', HttpStatus.NOT_FOUND);
    //         }

    //         return FindingClosure_RootCause_Extensions;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error fetching APdetail', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async updateFindingClosure_RootCause_Extensions(id_finding_closure_root_cause_extensions: string, data: UpdateFindingClosure_RootCause_ExtensionsDto) {
    //     try {
    //         const FindingClosure_RootCause_ExtensionsExists = await this.prismaService.findingClosure_RootCause_Extensions.findUnique({
    //             where: {
    //                 id_finding_closure_root_cause_extensions: +  id_finding_closure_root_cause_extensions,
    //             }
    //         });

    //         if (!FindingClosure_RootCause_ExtensionsExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         if (data.finding_identification_id) {
    //             const FindingIdentificationExists = await this.prismaService.findingIdentification.findUnique({
    //                 where: {
    //                     id_finding_identification: data.finding_identification_id,
    //                 }
    //             });

    //             if (!FindingIdentificationExists) {
    //                 throw new HttpException('Audit Plan not found', HttpStatus.NOT_FOUND)
    //             }
    //         }

    //         const updatedFindingClosure_RootCause_Extensions = await this.prismaService.findingClosure_RootCause_Extensions.update({
    //             where: {
    //                 id_finding_closure_root_cause_extensions: +  id_finding_closure_root_cause_extensions,
    //             },
    //             data: {
    //                 ...data,
    //             },
    //         });
    //         return updatedFindingClosure_RootCause_Extensions;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error updating ap detail', HttpStatus.BAD_REQUEST)
    //     }
    // }

    // async deleteFindingClosure_RootCause_Extensions(id_finding_closure_root_cause_extensions: string) {
    //     try {
    //         const FindingClosure_RootCause_ExtensionsExists = await this.prismaService.findingClosure_RootCause_Extensions.findUnique({
    //             where: {
    //                 id_finding_closure_root_cause_extensions: +  id_finding_closure_root_cause_extensions,
    //             },
    //         });

    //         if (!FindingClosure_RootCause_ExtensionsExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         await this.prismaService.findingClosure_RootCause_Extensions.delete({
    //             where: {
    //                 id_finding_closure_root_cause_extensions: +  id_finding_closure_root_cause_extensions
    //             },
    //         });

    //         return { success: true }
    //     } catch (error) {
    //         throw new HttpException(error.message || "Error deleting", HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }



    // async createFindingClosureCorrectiveActionPlan(data: CreateFindingClosureCorrectiveActionPlanDto) {
    //     try {
    //         const FindingClosureCorrectiveActionPlan = await this.prismaService.findingClosureCorrectiveActionPlan.findUnique({
    //             where: {
    //                 id_finding_closure_corrective_action_plan: data.finding_identification_id,
    //             },
    //         });
    //         if (!FindingClosureCorrectiveActionPlan) {
    //             throw new HttpException('FindingClosureCorrectiveActionPlan not found', HttpStatus.NOT_FOUND);
    //         }

    //         const newFindingClosureCorrectiveActionPlan = await this.prismaService.findingClosureCorrectiveActionPlan.create({
    //             data: {
    //                 item: data.item,
    //                 DOA_holder_date_comment: data.DOA_holder_date_comment,
    //                 DOA_holder_describe: data.DOA_holder_describe,
    //                 EASA_response_date: new Date(data.EASA_response_date),
    //                 EASA_feedback: data.EASA_feedback,
    //                 finding_identification_id: data.finding_identification_id
    //             },
    //         });
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error creating APdetail', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async getFindingClosureCorrectiveActionPlans() {
    //     try {
    //         return await this.prismaService.findingClosureCorrectiveActionPlan.findMany();
    //     } catch (error) {
    //         throw new HttpException('Error fetching FindingClosureCorrectiveActionPlans', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async getFindingClosureCorrectiveActionPlan(id_finding_closure_corrective_action_plan: string) {
    //     try {
    //         const FindingClosureCorrectiveActionPlan = await this.prismaService.findingClosureCorrectiveActionPlan.findUnique({
    //             where: {
    //                 id_finding_closure_corrective_action_plan: +  id_finding_closure_corrective_action_plan,  // Convert string to number
    //             },
    //         });

    //         if (!FindingClosureCorrectiveActionPlan) {
    //             throw new HttpException('APdetail not found', HttpStatus.NOT_FOUND);
    //         }

    //         return FindingClosureCorrectiveActionPlan;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error fetching APdetail', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async updateFindingClosureCorrectiveActionPlan(id_finding_closure_corrective_action_plan: string, data: UpdateFindingClosureCorrectiveActionPlanDto) {
    //     try {
    //         const FindingClosureCorrectiveActionPlanExists = await this.prismaService.findingClosureCorrectiveActionPlan.findUnique({
    //             where: {
    //                 id_finding_closure_corrective_action_plan: +  id_finding_closure_corrective_action_plan,
    //             }
    //         });

    //         if (!FindingClosureCorrectiveActionPlanExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         if (data.finding_identification_id) {
    //             const FindingIdentificationExists = await this.prismaService.findingIdentification.findUnique({
    //                 where: {
    //                     id_finding_identification: data.finding_identification_id,
    //                 }
    //             });

    //             if (!FindingIdentificationExists) {
    //                 throw new HttpException('Audit Plan not found', HttpStatus.NOT_FOUND)
    //             }
    //         }

    //         const updatedFindingClosureCorrectiveActionPlan = await this.prismaService.findingClosureCorrectiveActionPlan.update({
    //             where: {
    //                 id_finding_closure_corrective_action_plan: +  id_finding_closure_corrective_action_plan,
    //             },
    //             data: {
    //                 ...data,
    //             },
    //         });
    //         return updatedFindingClosureCorrectiveActionPlan;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error updating ap detail', HttpStatus.BAD_REQUEST)
    //     }
    // }

    // async deleteFindingClosureCorrectiveActionPlan(id_finding_closure_corrective_action_plan: string) {
    //     try {
    //         const FindingClosureCorrectiveActionPlanExists = await this.prismaService.findingClosureCorrectiveActionPlan.findUnique({
    //             where: {
    //                 id_finding_closure_corrective_action_plan: +  id_finding_closure_corrective_action_plan,
    //             },
    //         });

    //         if (!FindingClosureCorrectiveActionPlanExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         await this.prismaService.findingClosureCorrectiveActionPlan.delete({
    //             where: {
    //                 id_finding_closure_corrective_action_plan: +  id_finding_closure_corrective_action_plan
    //             },
    //         });

    //         return { success: true }
    //     } catch (error) {
    //         throw new HttpException(error.message || "Error deleting", HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }

    // async createFindingClosureClosingTheFinding(data: CreateFindingClosureClosingTheFindingDto) {
    //     try {
    //         const FindingClosureClosingTheFinding = await this.prismaService.findingClosureClosingTheFinding.findUnique({
    //             where: {
    //                 id_finding_closure_closing_the_finding: data.finding_identification_id,
    //             },
    //         });
    //         if (!FindingClosureClosingTheFinding) {
    //             throw new HttpException('FindingClosureClosingTheFinding not found', HttpStatus.NOT_FOUND);
    //         }

    //         const newFindingClosureClosingTheFinding = await this.prismaService.findingClosureClosingTheFinding.create({
    //             data: {
    //                 item: data.item,
    //                 DOA_holder_date_comment: data.DOA_holder_date_comment,
    //                 DOA_holder_describe: data.DOA_holder_describe,
    //                 EASA_response_date: new Date(data.EASA_response_date),
    //                 EASA_response: data.EASA_response,
    //                 finding_identification_id: data.finding_identification_id
    //             },
    //         });
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error creating APdetail', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async getFindingClosureClosingTheFindings() {
    //     try {
    //         return await this.prismaService.findingClosureClosingTheFinding.findMany();
    //     } catch (error) {
    //         throw new HttpException('Error fetching FindingClosureClosingTheFindings', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async getFindingClosureClosingTheFinding(id_finding_closure_closing_the_finding: string) {
    //     try {
    //         const FindingClosureClosingTheFinding = await this.prismaService.findingClosureClosingTheFinding.findUnique({
    //             where: {
    //                 id_finding_closure_closing_the_finding: +  id_finding_closure_closing_the_finding,  // Convert string to number
    //             },
    //         });

    //         if (!FindingClosureClosingTheFinding) {
    //             throw new HttpException('APdetail not found', HttpStatus.NOT_FOUND);
    //         }

    //         return FindingClosureClosingTheFinding;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error fetching APdetail', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async updateFindingClosureClosingTheFinding(id_finding_closure_closing_the_finding: string, data: UpdateFindingClosureClosingTheFindingDto) {
    //     try {
    //         const FindingClosureClosingTheFindingExists = await this.prismaService.findingClosureClosingTheFinding.findUnique({
    //             where: {
    //                 id_finding_closure_closing_the_finding: +  id_finding_closure_closing_the_finding,
    //             }
    //         });

    //         if (!FindingClosureClosingTheFindingExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         if (data.finding_identification_id) {
    //             const FindingIdentificationExists = await this.prismaService.findingIdentification.findUnique({
    //                 where: {
    //                     id_finding_identification: data.finding_identification_id,
    //                 }
    //             });

    //             if (!FindingIdentificationExists) {
    //                 throw new HttpException('Audit Plan not found', HttpStatus.NOT_FOUND)
    //             }
    //         }

    //         const updatedFindingClosureClosingTheFinding = await this.prismaService.findingClosureClosingTheFinding.update({
    //             where: {
    //                 id_finding_closure_closing_the_finding: +  id_finding_closure_closing_the_finding,
    //             },
    //             data: {
    //                 ...data,
    //             },
    //         });
    //         return updatedFindingClosureClosingTheFinding;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error updating ap detail', HttpStatus.BAD_REQUEST)
    //     }
    // }

    // async deleteFindingClosureClosingTheFinding(id_finding_closure_closing_the_finding: string) {
    //     try {
    //         const FindingClosureClosingTheFindingExists = await this.prismaService.findingClosureClosingTheFinding.findUnique({
    //             where: {
    //                 id_finding_closure_closing_the_finding: +  id_finding_closure_closing_the_finding,
    //             },
    //         });

    //         if (!FindingClosureClosingTheFindingExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         await this.prismaService.findingClosureClosingTheFinding.delete({
    //             where: {
    //                 id_finding_closure_closing_the_finding: +  id_finding_closure_closing_the_finding
    //             },
    //         });

    //         return { success: true }
    //     } catch (error) {
    //         throw new HttpException(error.message || "Error deleting", HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }


    // async createClosureAndPerformance(data: CreateClosureAndPerformanceDto) {
    //     try {
    //         const ClosureAndPerformance = await this.prismaService.closureAndPerformance.findUnique({
    //             where: {
    //                 id_closure_and_performance: data.finding_identification_id,
    //             },
    //         });
    //         if (!ClosureAndPerformance) {
    //             throw new HttpException('ClosureAndPerformance not found', HttpStatus.NOT_FOUND);
    //         }

    //         const newClosureAndPerformance = await this.prismaService.closureAndPerformance.create({
    //             data: {
    //                 closure: data.closure,
    //                 No_of_extention: data.No_of_extention,
    //                 was_the_finding_overdue: data.was_the_finding_overdue,
    //                 finding_identification_id: data.finding_identification_id
    //             },
    //         });
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error creating APdetail', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async getClosureAndPerformances() {
    //     try {
    //         return await this.prismaService.closureAndPerformance.findMany();
    //     } catch (error) {
    //         throw new HttpException('Error fetching ClosureAndPerformances', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async getClosureAndPerformance(id_closure_and_performance: string) {
    //     try {
    //         const ClosureAndPerformance = await this.prismaService.closureAndPerformance.findUnique({
    //             where: {
    //                 id_closure_and_performance: +  id_closure_and_performance,  // Convert string to number
    //             },
    //         });

    //         if (!ClosureAndPerformance) {
    //             throw new HttpException('APdetail not found', HttpStatus.NOT_FOUND);
    //         }

    //         return ClosureAndPerformance;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error fetching APdetail', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // async updateClosureAndPerformance(id_closure_and_performance: string, data: UpdateClosureAndPerformanceDto) {
    //     try {
    //         const ClosureAndPerformanceExists = await this.prismaService.closureAndPerformance.findUnique({
    //             where: {
    //                 id_closure_and_performance: +  id_closure_and_performance,
    //             }
    //         });

    //         if (!ClosureAndPerformanceExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         if (data.finding_identification_id) {
    //             const FindingIdentificationExists = await this.prismaService.findingIdentification.findUnique({
    //                 where: {
    //                     id_finding_identification: data.finding_identification_id,
    //                 }
    //             });

    //             if (!FindingIdentificationExists) {
    //                 throw new HttpException('Audit Plan not found', HttpStatus.NOT_FOUND)
    //             }
    //         }

    //         const updatedClosureAndPerformance = await this.prismaService.closureAndPerformance.update({
    //             where: {
    //                 id_closure_and_performance: +  id_closure_and_performance,
    //             },
    //             data: {
    //                 ...data,
    //             },
    //         });
    //         return updatedClosureAndPerformance;
    //     } catch (error) {
    //         throw new HttpException(error.message || 'Error updating ap detail', HttpStatus.BAD_REQUEST)
    //     }
    // }

    // async deleteClosureAndPerformance(id_closure_and_performance: string) {
    //     try {
    //         const ClosureAndPerformanceExists = await this.prismaService.closureAndPerformance.findUnique({
    //             where: {
    //                 id_closure_and_performance: +  id_closure_and_performance,
    //             },
    //         });

    //         if (!ClosureAndPerformanceExists) {
    //             throw new HttpException('AP Detail not found', HttpStatus.NOT_FOUND)
    //         }

    //         await this.prismaService.closureAndPerformance.delete({
    //             where: {
    //                 id_closure_and_performance: +  id_closure_and_performance
    //             },
    //         });

    //         return { success: true }
    //     } catch (error) {
    //         throw new HttpException(error.message || "Error deleting", HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }



}
