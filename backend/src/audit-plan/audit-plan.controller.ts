import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuditPlanService } from './audit-plan.service';

@Controller('audit-plan')
export class AuditPlanController {
    // constructor(private prisma: PrismaService,
    //     private auditPlanService: AuditPlanService
    // ) { }

    // @Get()
    // async getAuditPlans() {
    //     return await this.auditPlanService.getAuditPlans();
    // }

    // @Post()
    // async createAuditPlan(@Body() auditPlan: {
    //     doc_no: number,
    //     doc_date: Date,
    //     subject: string,
    //     audit_type: string,
    // }) {
    //     try {
    //         await this.auditPlanService.createAuditPlan({
    //             doc_no: auditPlan.doc_no,
    //             doc_date: new Date(auditPlan.doc_date).toISOString(),
    //             subject: auditPlan.subject,
    //             audit_type: auditPlan.audit_type,
    //         })
    //         return {
    //             success: true,
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             success: false,
    //         }
    //     }
    // }

    // @Put(':id_audit_plan ')
    // async updateAuditPlan(@Param('id_audit_plan ') id_audit_plan: string, @Body() auditPlan: {
    //     doc_no: number,
    //     doc_date: Date,
    //     subject: string,
    //     audit_type: string,


    // }) {
    //     try {
    //         await this.auditPlanService.updateAuditPlan(id_audit_plan, {
    //             doc_no: auditPlan.doc_no,
    //             doc_date: new Date(auditPlan.doc_date).toISOString(),
    //             subject: auditPlan.subject,
    //             audit_type: auditPlan.audit_type,
    //         })
    //         return {
    //             success: true,
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             success: false,
    //         }
    //     }
    // }

    // @Get(':id_audit_plan')
    // async getAuditPlan(@Param('id_audit_plan') id_audit_plan: string) {
    //     const auditPlan = await this.auditPlanService.getAuditPlan(id_audit_plan);
    //     if (!auditPlan) {
    //         throw new HttpException('auditPlan not found', 404);
    //     }
    //     return auditPlan;
    // }

    // @Delete(':id_audit_plan')
    // async deleteAuditPlan(@Param('id_audit_plan') id_audit_plan: string) {
    //     const auditPlan = await this.auditPlanService.deleteAuditPlan(id_audit_plan);
    //     if (!auditPlan) {
    //         throw new HttpException('auditPlan not found', 404);
    //     }
    //     await this.prisma.auditPlan.delete({
    //         where: {
    //             id_audit_plan: +id_audit_plan
    //         }
    //     });
    //     return {
    //         success: true
    //     }
    // }

    // @Get(':id_audit_plan/apdetails')
    // async getAPdetails() {
    //     return await this.auditPlanService.getAPdetails();
    // }

    // @Post(':id_audit_plan/apdetails')
    // async createAPdetail(@Body() apdetail: {
    //     no_item: number
    //     requirement: string
    //     work_station: string
    //     planned_week: number
    //     actual_visit_date: Date
    //     auditReportEvidenceNbr: string
    // }) {
    //     try {
    //         await this.auditPlanService.createAPdetail({
    //             no_item: apdetail.no_item,
    //             requirement: apdetail.requirement,
    //             work_station: apdetail.work_station,
    //             planned_week: apdetail.planned_week,
    //             actual_visit_date: new Date(apdetail.actual_visit_date).toISOString(),
    //             auditReportEvidenceNbr: apdetail.auditReportEvidenceNbr,
    //         })
    //         return {
    //             success: true,
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             success: false,
    //         }
    //     }
    // }

    // @Put(':id_audit_plan/apdetails/:id_ap_detail')
    // async updateAPdetail(@Param('id_ap_detail') id_ap_detail: string, @Body() apdetail: {
    //     no_item: number
    //     requirement: string
    //     work_station: string
    //     planned_week: number
    //     actual_visit_date: Date
    //     auditReportEvidenceNbr: string
    // }) {
    //     try {
    //         await this.auditPlanService.updateAPdetail(id_ap_detail, {
    //             no_item: apdetail.no_item,
    //             requirement: apdetail.requirement,
    //             work_station: apdetail.work_station,
    //             planned_week: apdetail.planned_week,
    //             actual_visit_date: new Date(apdetail.actual_visit_date).toISOString(),
    //             auditReportEvidenceNbr: apdetail.auditReportEvidenceNbr,
    //         })
    //         return {
    //             success: true,
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             success: false,
    //         }
    //     }
    // }

    // @Get(':id_audit_plan/apdetails/:id_ap_detail')
    // async getAPdetail(@Param('id_ap_detail') id_ap_detail: string) {
    //     const apdetail = await this.auditPlanService.getAPdetail(id_ap_detail);
    //     if (!apdetail) {
    //         throw new HttpException('apdetail not found', 404);
    //     }
    //     return apdetail;
    // }

    // @Delete(':id_audit_plan/apdetails/:id_ap_detail')
    // async deleteAPdetail(@Param('id_ap_detail') id_ap_detail: string) {
    //     const apdetail = await this.auditPlanService.deleteAPdetail(id_ap_detail);
    //     if (!apdetail) {
    //         throw new HttpException('apdetail not found', 404);
    //     }
    //     await this.prisma.aPdetail.delete({
    //         where: {
    //             id_ap_detail: +id_ap_detail
    //         }
    //     });
    //     return {
    //         success: true
    //     }
    // }

    // @Get(':id_audit_plan/apdetails/:id_ap_detail/issuences')
    // async getIssuences() {
    //     return await this.auditPlanService.getIssuences();
    // }

    // @Post(':id_audit_plan/apdetails/:id_ap_detail/issuences')
    // async createIssuence(@Body() issuence: {
    //     issueNbr: number
    //     issueDate: Date
    //     issueDesc: string
    //     issueBy: string
    //     HDOapprove: string
    // }) {
    //     try {
    //         await this.auditPlanService.createIssuence({
    //             issueNbr: issuence.issueNbr,
    //             issueDate: new Date(issuence.issueDate).toISOString(),
    //             issueDesc: issuence.issueDesc,
    //             issueBy: issuence.issueBy,
    //             HDOapprove: issuence.HDOapprove,
    //         })
    //         return {
    //             success: true,
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             success: false,
    //         }
    //     }
    // }

    // @Put(':id_audit_plan/apdetails/:id_ap_detail/issuences/:id_issuence')
    // async updateIssuence(@Param('id_issuence') id_issuence: string, @Body() issuence: {
    //     issueNbr: number
    //     issueDate: Date
    //     issueDesc: string
    //     issueBy: string
    //     HDOapprove: string
    // }) {
    //     try {
    //         await this.auditPlanService.updateIssuence(id_issuence, {
    //             issueNbr: issuence.issueNbr,
    //             issueDate: new Date(issuence.issueDate).toISOString(),
    //             issueDesc: issuence.issueDesc,
    //             issueBy: issuence.issueBy,
    //             HDOapprove: issuence.HDOapprove,
    //         })
    //         return {
    //             success: true,
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             success: false,
    //         }
    //     }
    // }

    // @Get(':id_audit_plan/apdetails/:id_ap_detail/issuences/:id_issuence')
    // async getIssuence(@Param('id_issuence') id_issuence: string) {
    //     const issuence = await this.auditPlanService.getIssuence(id_issuence);
    //     if (!issuence) {
    //         throw new HttpException('issuence not found', 404);
    //     }
    //     return issuence;
    // }

    // @Delete(':id_audit_plan/apdetails/:id_ap_detail/issuences/:id_issuence')
    // async deleteIssuence(@Param('id_issuence') id_issuence: string) {
    //     const issuence = await this.auditPlanService.deleteIssuence(id_issuence);
    //     if (!issuence) {
    //         throw new HttpException('issuence not found', 404);
    //     }
    //     await this.prisma.issuence.delete({
    //         where: {
    //             id_issuence: +id_issuence
    //         }
    //     });
    //     return {
    //         success: true
    //     }
    // }


}