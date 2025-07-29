import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

@Injectable()
export class ActionLogService {
    constructor(private readonly prisma: PrismaService) { }

    async createActionLog(data: CreateActionLogDto) {
        try {
            const actionLog = await this.prisma.actionLog.create({
                data: {
                    ...data,
                },
            });
            return actionLog;
        } catch (error) {
            console.error('Error creating ActionLog:', error);
            throw error;
        }
    }

    async getActionLogs(keyword?: string) {
        try {
            if (keyword) {
                const parsedDate = new Date(keyword);
                const isValidDate = !isNaN(parsedDate.getTime());

                return await this.prisma.actionLog.findMany({
                    where: {
                        OR: [
                            {
                                regulation_based: {
                                    contains: keyword,
                                },
                            },
                            {
                                action_nbr: {
                                    contains: keyword,
                                },
                            },
                            {
                                reference_PACLR_nbr: {
                                    contains: keyword,
                                },
                            },
                            {
                                action_description: {
                                    contains: keyword,
                                },
                            },
                            ...(isValidDate
                                ? [
                                    {
                                        issued_date: parsedDate,
                                    },
                                ]
                                : []),
                        ],
                    },
                });
            }
            return await this.prisma.actionLog.findMany();
        }
        catch (error) {
            console.error('Error fetching ActionLogs:', error);
            throw error;
        }
    }

    async getActionLog(actionLog_id: string) {
        try {
            return await this.prisma.actionLog.findUnique({
                where: {
                    actionLog_id: +actionLog_id,
                },
            });
        } catch (error) {
            console.error('Error fetching ActionLog:', error);
            throw error;
        }
    }

    async updateActionLog(actionLog_id: string, data: UpdateActionLogDto) {
        try {
            return await this.prisma.actionLog.update({
                where: {
                    actionLog_id: +actionLog_id,
                },
                data: {
                    ...data,
                },
            });
        } catch (error) {
            console.error('Error updating ActionLog:', error);
            throw error;
        }
    }

    async deleteActionLog(actionLog_id: number) {
        try {
            const actionLog = await this.prisma.actionLog.findUnique({
                where: {
                    actionLog_id: actionLog_id,
                },
            });

            if (!actionLog) {
                throw new Error('ActionLog tidak ditemukan');
            }

            return await this.prisma.actionLog.delete({
                where: {
                    actionLog_id: actionLog_id,
                },
            });
        } catch (error) {
            console.error('Terjadi kesalahan saat menghapus ActionLog:', error.message || error);
            throw new Error('Gagal menghapus ActionLog');
        }
    }

}
