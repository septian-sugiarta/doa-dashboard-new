import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ActionLogService } from './action-log.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Role } from 'src/auth/role/role.enum';
import { Roles } from 'src/auth/role/roles.decorator';

interface CreateActionLogDto {
    regulation_based: string;
    action_nbr: string;
    reference_PACLR_nbr: string;
    issued_date: Date;
    action_description: string;
    audit_area: string;
    status: string;
    implementationAction_date: Date;
    evidence: string;
    close_date: Date;
}

interface UpdateActionLogDto {
    regulation_based?: string;
    action_nbr?: string;
    reference_PACLR_nbr?: string;
    issued_date?: Date;
    action_description?: string;
    audit_area?: string;
    status?: string;
    implementationAction_date?: Date;
    evidence?: string;
    close_date?: Date;
}

@UseGuards(AuthGuard)
@Controller('action-log')
export class ActionLogController {
    constructor(private readonly actionLogService: ActionLogService) { }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get()
    async getActionLogs(@Query('keyword') keyword?: string) {
        try {
            if (keyword) {
                return await this.actionLogService.getActionLogs(keyword);
            }

            return await this.actionLogService.getActionLogs();
        } catch (error) {
            console.error('Error fetching ActionLogs:', error);
            throw error;
        }
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Post()
    async createActionLog(@Body() ActionLog: CreateActionLogDto) {
        try {
            await this.actionLogService.createActionLog({
                ...ActionLog,
                issued_date: new Date(ActionLog.issued_date),
                implementationAction_date: new Date(ActionLog.implementationAction_date),
                close_date: new Date(ActionLog.close_date),
            });
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error creating NcrForm', 500);
        }
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Put(':ActionLog_id')
    async updateActionLog(@Param('ActionLog_id') ActionLog_id: string, @Body() ActionLog: UpdateActionLogDto) {
        try {
            await this.actionLogService.updateActionLog(ActionLog_id, {
                ...ActionLog,
                issued_date: ActionLog.issued_date ? new Date(ActionLog.issued_date) : undefined,
                implementationAction_date: ActionLog.implementationAction_date ? new Date(ActionLog.implementationAction_date) : undefined,
                close_date: ActionLog.close_date ? new Date(ActionLog.close_date) : undefined,
            });
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error updating ActionLog', 500);
        }
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get(':ActionLog_id')
    async getActionLog(@Param('ActionLog_id') ActionLog_id: string) {
        try {
            const ActionLog = await this.actionLogService.getActionLog(ActionLog_id);
            if (!ActionLog) {
                throw new HttpException('ActionLog not found', 404);
            }
            return ActionLog;
        } catch (error) {
            console.error('Error fetching ActionLog:', error);
            throw error;
        }
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Delete(':ActionLog_id')
    async deleteActionLog(@Param('ActionLog_id') ActionLog_id: string) {
        try {
            await this.actionLogService.deleteActionLog(Number(ActionLog_id));
            return { success: true };
        } catch (error) {
            console.error('Terjadi kesalahan saat menghapus ActionLog:', error.message || error);
            throw new HttpException('Gagal menghapus ActionLog', 500);
        }
    }

}
