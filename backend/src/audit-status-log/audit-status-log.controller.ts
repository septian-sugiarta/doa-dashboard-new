import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuditStatusLogService } from './audit-status-log.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { EmailService } from 'src/email/email.service';

interface CreateAuditStatusLogDto {
    regulation_based: string;
    doc_nbr: string;
    statusLog_date: Date;
    subject: string;
    reason_of_issuance: string;
    prepared_by: string;
    prepared_date: Date;
    checked_by: string;
    checked_date: Date;
}

interface UpdateAuditStatusLogDto {
    regulation_based?: string;
    doc_nbr?: string;
    statusLog_date?: Date;
    subject?: string;
    reason_of_issuance?: string;
    prepared_by?: string;
    prepared_date?: Date;
    checked_by?: string;
    checked_date?: Date;
}

@UseGuards(AuthGuard)
@Controller('audit-status-log')
export class AuditStatusLogController {
    constructor(private readonly auditStatusLogService: AuditStatusLogService, private emailService: EmailService) { }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get()
    async getAuditStatusLogs(@Query('keyword') keyword?: string) {
        try {
            if (keyword) {
                return await this.auditStatusLogService.getAuditStatusLogs(keyword);
            }

            return await this.auditStatusLogService.getAuditStatusLogs();
        } catch (error) {
            console.error('Error fetching AuditStatusLogs:', error);
            throw error;
        }
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Post()
    async createAuditStatusLog(@Body() auditStatusLog: CreateAuditStatusLogDto) {
        try {
            const createdAuditStatusLog = await this.auditStatusLogService.createAuditStatusLog({
                ...auditStatusLog,
                statusLog_date: new Date(auditStatusLog.statusLog_date),
                prepared_date: new Date(auditStatusLog.prepared_date),
                checked_date: new Date(auditStatusLog.checked_date),
            });
            await this.emailService.sendCheckedByEmail(createdAuditStatusLog.auditStatusLog_id.toString());
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error creating NcrForm', 500);
        }
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Put(':auditStatusLog_id')
    async updateAuditStatusLog(@Param('auditStatusLog_id') auditStatusLog_id: string, @Body() auditStatusLog: UpdateAuditStatusLogDto) {
        try {
            await this.auditStatusLogService.updateAuditStatusLog(auditStatusLog_id, {
                ...auditStatusLog,
                statusLog_date: auditStatusLog.statusLog_date ? new Date(auditStatusLog.statusLog_date) : undefined,
                prepared_date: auditStatusLog.prepared_date ? new Date(auditStatusLog.prepared_date) : undefined,
                checked_date: auditStatusLog.checked_date ? new Date(auditStatusLog.checked_date) : undefined,
            });
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error updating AuditStatusLog', 500);
        }
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get(':auditStatusLog_id')
    async getAuditStatusLog(@Param('auditStatusLog_id') auditStatusLog_id: string) {
        try {
            const auditStatusLog = await this.auditStatusLogService.getAuditStatusLog(auditStatusLog_id);
            if (!auditStatusLog) {
                throw new HttpException('AuditStatusLog not found', 404);
            }
            return auditStatusLog;
        } catch (error) {
            console.error('Error fetching AuditStatusLog:', error);
            throw error;
        }
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Delete(':auditStatusLog_id')
    async deleteAuditStatusLog(@Param('auditStatusLog_id') auditStatusLog_id: string) {
        try {
            await this.auditStatusLogService.deleteAuditStatusLog(Number(auditStatusLog_id));
            return { success: true };
        } catch (error) {
            console.error('Terjadi kesalahan saat menghapus AuditStatusLog:', error.message || error);
            throw new HttpException('Gagal menghapus AuditStatusLog', 500);
        }
    }

}
