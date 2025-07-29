import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { NcrReplyService } from './ncr-reply.service';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { EmailService } from 'src/email/email.service';

interface CreateNcrReplyDto {
    RCA_problem: string;
    Corrective_Action: string;
    Preventive_Action: string;
    Recommend_corrective_action: string;
    Identified_by_Auditee: string;
    Identified_Date: Date;
    Accept_by_Auditor: string;
    Auditor_Accept_date: Date;
    implementationReply_date: Date;
    ncrId: number;
}

interface UpdateNcrReplyDto {
    RCA_problem?: string;
    Corrective_Action?: string;
    Preventive_Action?: string;
    Recommend_corrective_action?: string;
    Identified_by_Auditee?: string;
    Identified_Date?: Date;
    Accept_by_Auditor?: string;
    Auditor_Accept_date?: Date;
    implementationReply_date?: Date;
    ncrId?: number;
}

@UseGuards(AuthGuard)
@Controller('ncr-reply')
export class NcrReplyController {
    constructor(private prisma: PrismaService, private ncrReplyService: NcrReplyService, private emailService: EmailService) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get()
    async getNcrReplies() {
        try {
            return await this.ncrReplyService.getNcrReplies();
        } catch (error) {
            throw new HttpException('Error fetching NcrReplies', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Post()
    async createNcrReply(@Body() ncrReply: CreateNcrReplyDto) {
        try {
            const createdNcrReply = await this.ncrReplyService.createNcrReply({
                RCA_problem: ncrReply.RCA_problem,
                Corrective_Action: ncrReply.Corrective_Action,
                Preventive_Action: ncrReply.Preventive_Action,
                Recommend_corrective_action: ncrReply.Recommend_corrective_action,
                Identified_by_Auditee: ncrReply.Identified_by_Auditee,
                Identified_Date: new Date(ncrReply.Identified_Date),
                Accept_by_Auditor: ncrReply.Accept_by_Auditor,
                Auditor_Accept_date: new Date(ncrReply.Auditor_Accept_date),
                implementationReply_date: new Date(ncrReply.implementationReply_date),
                ncrId: ncrReply.ncrId,
            });
            await this.emailService.sendAuditorAcceptedEmail(createdNcrReply.ncrReply_id.toString());
            return { success: true };
        } catch (error) {
            throw new HttpException('Error creating NcrReply', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Put(':ncrReply_id')
    async updateNcrReply(@Param('ncrReply_id') ncrReply_id: string, @Body() ncrReply: UpdateNcrReplyDto) {
        try {
            await this.ncrReplyService.updateNcrReply(ncrReply_id, {
                RCA_problem: ncrReply.RCA_problem,
                Corrective_Action: ncrReply.Corrective_Action,
                Preventive_Action: ncrReply.Preventive_Action,
                Recommend_corrective_action: ncrReply.Recommend_corrective_action,
                Identified_by_Auditee: ncrReply.Identified_by_Auditee,
                Identified_Date: ncrReply.Identified_Date ? new Date(ncrReply.Identified_Date) : undefined,
                Accept_by_Auditor: ncrReply.Accept_by_Auditor,
                Auditor_Accept_date: ncrReply.Auditor_Accept_date ? new Date(ncrReply.Auditor_Accept_date) : undefined,
                ncrId: ncrReply.ncrId,
            });
            return { success: true };
        } catch (error) {
            throw new HttpException('Error updating NcrReply', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get(':ncrReply_id')
    async getNcrReply(@Param('ncrReply_id') ncrReply_id: string) {
        try {
            const ncrReply = await this.ncrReplyService.getNcrReply(ncrReply_id);
            if (!ncrReply) {
                throw new HttpException('NCR Reply not found', 404);
            }
            return ncrReply;
        } catch (error) {
            throw new HttpException('Error fetching NcrReply', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Delete(':ncrReply_id')
    async deleteNcrReply(@Param('ncrReply_id') ncrReply_id: string) {
        const ncrReply = await this.ncrReplyService.getNcrReply(ncrReply_id);
        if (!ncrReply) {
            throw new HttpException('NCR Reply not found', 404);
        }

        await this.ncrReplyService.deleteNcrReply(ncrReply_id);
        return {
            success: true
        };
    }

}
