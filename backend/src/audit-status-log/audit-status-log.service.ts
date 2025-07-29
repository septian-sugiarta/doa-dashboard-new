import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

@Injectable()
export class AuditStatusLogService {
    constructor(private readonly prisma: PrismaService) { }

    async createAuditStatusLog(data: CreateAuditStatusLogDto) {
        try {
            const auditStatusLog = await this.prisma.auditStatusLog.create({
                data: {
                    ...data,
                },
            });
            return auditStatusLog;
        } catch (error) {
            console.error('Error creating AuditStatusLog:', error);
            throw error;
        }
    }

    async getAuditStatusLogs(keyword?: string) {
        try {
            if (keyword) {
                const parsedDate = new Date(keyword);
                const isValidDate = !isNaN(parsedDate.getTime());

                return await this.prisma.auditStatusLog.findMany({
                    where: {
                        OR: [
                            {
                                regulation_based: {
                                    contains: keyword,
                                },
                            },
                            {
                                doc_nbr: {
                                    contains: keyword,
                                },
                            },
                            ...(isValidDate
                                ? [
                                    {
                                        statusLog_date: parsedDate,
                                    },
                                ]
                                : []),
                            {
                                subject: {
                                    contains: keyword,
                                },
                            },
                            {
                                reason_of_issuance: {
                                    contains: keyword,
                                },
                            },
                        ],
                    },
                });
            }
            return await this.prisma.auditStatusLog.findMany();
        }
        catch (error) {
            console.error('Error fetching AuditStatusLogs:', error);
            throw error;
        }
    }

    async getAuditStatusLog(auditStatusLog_id: string) {
        try {
            return await this.prisma.auditStatusLog.findUnique({
                where: {
                    auditStatusLog_id: +auditStatusLog_id,
                },
            });
        } catch (error) {
            console.error('Error fetching AuditStatusLog:', error);
            throw error;
        }
    }

    async updateAuditStatusLog(auditStatusLog_id: string, data: UpdateAuditStatusLogDto) {
        try {
            return await this.prisma.auditStatusLog.update({
                where: {
                    auditStatusLog_id: +auditStatusLog_id,
                },
                data: {
                    ...data,
                },
            });
        } catch (error) {
            console.error('Error updating AuditStatusLog:', error);
            throw error;
        }
    }

    async deleteAuditStatusLog(auditStatusLog_id: number) {
        try {
            const auditStatusLog = await this.prisma.auditStatusLog.findUnique({
                where: {
                    auditStatusLog_id: auditStatusLog_id,
                },
            });

            if (!auditStatusLog) {
                throw new Error('AuditStatusLog tidak ditemukan');
            }

            return await this.prisma.auditStatusLog.delete({
                where: {
                    auditStatusLog_id: auditStatusLog_id,
                },
            });
        } catch (error) {
            console.error('Terjadi kesalahan saat menghapus AuditStatusLog:', error.message || error);
            throw new Error('Gagal menghapus AuditStatusLog');
        }
    }

}
