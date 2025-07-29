import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NcrFollowResultService } from './ncr-follow-result.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { EmailService } from 'src/email/email.service';

interface CreateNcrFollowResultDto {
    Close_Corrective_Actions: string;
    Proposed_Close_Auditee: string;
    Proposed_Close_Date: Date;
    Implemented_close_date: Date;
    Is_close: string;
    effectiveness: string;
    Refer_to_Verify_Sheet: string;
    Sheet_No: string;
    New_NCR_Issue_nbr: string;
    Close_approved_by: string;
    Close_approved_date: Date;
    Verified_Chief_IM: string;
    Verified_Date: Date;
    followup_audit_result: string;
    evidence: string;
    ncrId: number;
    ncrReplyId: number;
}

interface UpdateNcrFollowResultDto {
    Close_Corrective_Actions?: string;
    Proposed_Close_Auditee?: string;
    Proposed_Close_Date?: Date;
    Implemented_close_date?: Date;
    Is_close?: string;
    effectiveness?: string;
    Refer_to_Verify_Sheet?: string;
    Sheet_No?: string;
    New_NCR_Issue_nbr?: string;
    Close_approved_by?: string;
    Close_approved_date?: Date;
    Verified_Chief_IM?: string;
    Verified_Date?: Date;
    followup_audit_result?: string;
    evidence?: string;
    ncrId?: number;
    ncrReplyId?: number;
}

@UseGuards(AuthGuard)
@Controller('ncr-follow-result')
export class NcrFollowResultController {
    constructor(private prisma: PrismaService, private ncrFollowResultService: NcrFollowResultService, private emailService: EmailService) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get()
    async getNcrFollowResults() {
        try {
            return await this.ncrFollowResultService.getNcrFollowResults();
        } catch (error) {
            throw new HttpException('Error fetching NCR Follow Results', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Post()
    async createNcrFollowResult(@Body() ncrFollowResult: CreateNcrFollowResultDto) {
        try {
            const createdNcrFollowResult = await this.ncrFollowResultService.createNcrFollowResult({
                Close_Corrective_Actions: ncrFollowResult.Close_Corrective_Actions,
                Proposed_Close_Auditee: ncrFollowResult.Proposed_Close_Auditee,
                Proposed_Close_Date: new Date(ncrFollowResult.Proposed_Close_Date),
                Implemented_close_date: new Date(ncrFollowResult.Implemented_close_date),
                Is_close: ncrFollowResult.Is_close,
                effectiveness: ncrFollowResult.effectiveness,
                Refer_to_Verify_Sheet: ncrFollowResult.Refer_to_Verify_Sheet,
                Sheet_No: ncrFollowResult.Sheet_No,
                New_NCR_Issue_nbr: ncrFollowResult.New_NCR_Issue_nbr,
                Close_approved_by: ncrFollowResult.Close_approved_by,
                Close_approved_date: new Date(ncrFollowResult.Close_approved_date),
                Verified_Chief_IM: ncrFollowResult.Verified_Chief_IM,
                Verified_Date: new Date(ncrFollowResult.Verified_Date),
                followup_audit_result: ncrFollowResult.followup_audit_result,
                evidence: ncrFollowResult.evidence,
                ncrId: ncrFollowResult.ncrId,
                ncrReplyId: ncrFollowResult.ncrReplyId,
            });
            await this.emailService.sendVerifiedIMEmail(createdNcrFollowResult.ncrFollowResult_id.toString());
            return { success: true };
        } catch (error) {
            throw new HttpException('Error creating NCR Follow Result', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Put(':ncrFollowResult_id')
    async updateNcrFollowResult(@Param('ncrFollowResult_id') ncrFollowResult_id: string, @Body() ncrFollowResult: UpdateNcrFollowResultDto) {
        try {
            await this.ncrFollowResultService.updateNcrFollowResult(
                ncrFollowResult_id,
                {
                    Close_Corrective_Actions: ncrFollowResult.Close_Corrective_Actions,
                    Proposed_Close_Auditee: ncrFollowResult.Proposed_Close_Auditee,
                    Proposed_Close_Date: ncrFollowResult.Proposed_Close_Date
                        ? new Date(ncrFollowResult.Proposed_Close_Date)
                        : undefined,
                    Implemented_close_date: ncrFollowResult.Implemented_close_date
                        ? new Date(ncrFollowResult.Implemented_close_date)
                        : undefined,
                    Is_close: ncrFollowResult.Is_close,
                    effectiveness: ncrFollowResult.effectiveness,
                    Refer_to_Verify_Sheet: ncrFollowResult.Refer_to_Verify_Sheet,
                    Sheet_No: ncrFollowResult.Sheet_No,
                    New_NCR_Issue_nbr: ncrFollowResult.New_NCR_Issue_nbr,
                    Close_approved_by: ncrFollowResult.Close_approved_by,
                    Close_approved_date: ncrFollowResult.Close_approved_date
                        ? new Date(ncrFollowResult.Close_approved_date)
                        : undefined,
                    Verified_Chief_IM: ncrFollowResult.Verified_Chief_IM,
                    Verified_Date: ncrFollowResult.Verified_Date
                        ? new Date(ncrFollowResult.Verified_Date)
                        : undefined,
                    ncrId: ncrFollowResult.ncrId,
                    ncrReplyId: ncrFollowResult.ncrReplyId,
                }
            );
            return { success: true };
        } catch (error) {
            throw new HttpException('Error updating NCR Follow Result', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get(':ncrFollowResult_id')
    async getNcrFollowResult(@Param('ncrFollowResult_id') ncrFollowResult_id: string) {
        try {
            const ncrFollowResult = await this.ncrFollowResultService.getNcrFollowResult(ncrFollowResult_id);
            if (!ncrFollowResult) {
                throw new HttpException('NCR Follow Result not found', 404);
            }
            return ncrFollowResult;
        } catch (error) {
            throw new HttpException('Error fetching NCR Follow Result', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Delete(':ncrFollowResult_id')
    async deleteNcrFollowResult(@Param('ncrFollowResult_id') ncrFollowResult_id: string) {
        const ncrFollowResult = await this.ncrFollowResultService.getNcrFollowResult(ncrFollowResult_id);
        if (!ncrFollowResult) {
            throw new HttpException('NCR Follow Result not found', 404);
        }

        await this.ncrFollowResultService.deleteNcrFollowResult(ncrFollowResult_id);


        return {
            success: true
        };
    }
}