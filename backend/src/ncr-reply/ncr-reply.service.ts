import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

@Injectable()
export class NcrReplyService {
    constructor(private readonly prismaService: PrismaService) { }

    async createNcrReply(data: CreateNcrReplyDto) {
        try {
            const ncrFormExists = await this.prismaService.ncrForm.findUnique({
                where: { NCR_init_ID: data.ncrId },
            });

            if (!ncrFormExists) {
                throw new HttpException('NcrForm not found', HttpStatus.NOT_FOUND);
            }

            const ncrReply = await this.prismaService.ncrReply.create({
                data: {
                    RCA_problem: data.RCA_problem,
                    Corrective_Action: data.Corrective_Action,
                    Preventive_Action: data.Preventive_Action,
                    Recommend_corrective_action: data.Recommend_corrective_action,
                    Identified_by_Auditee: data.Identified_by_Auditee,
                    Identified_Date: new Date(data.Identified_Date),
                    Accept_by_Auditor: data.Accept_by_Auditor,
                    Auditor_Accept_date: new Date(data.Auditor_Accept_date),
                    implementationReply_date: new Date(data.implementationReply_date),
                    ncrId: data.ncrId,
                },
            });

            return ncrReply;
        } catch (error) {
            throw new HttpException(error.message || 'Error creating NcrReply', HttpStatus.BAD_REQUEST);
        }
    }

    async getNcrReplies() {
        try {
            return await this.prismaService.ncrReply.findMany();
        } catch (error) {
            throw new HttpException('Error fetching NcrReplies', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getNcrReply(ncrReply_id: string) {
        try {
            const ncrReply = await this.prismaService.ncrReply.findUnique({
                where: {
                    ncrReply_id: +ncrReply_id,
                },
            });

            if (!ncrReply) {
                throw new HttpException('NcrReply not found', HttpStatus.NOT_FOUND);
            }

            return ncrReply;
        } catch (error) {
            throw new HttpException(error.message || 'Error fetching NcrReply', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateNcrReply(ncrReply_id: string, data: UpdateNcrReplyDto) {
        try {
            const ncrReplyExists = await this.prismaService.ncrReply.findUnique({
                where: {
                    ncrReply_id: +ncrReply_id,
                },
            });

            if (!ncrReplyExists) {
                throw new HttpException('NcrReply not found', HttpStatus.NOT_FOUND);
            }

            if (data.ncrId) {
                const ncrFormExists = await this.prismaService.ncrForm.findUnique({
                    where: { NCR_init_ID: data.ncrId },
                });

                if (!ncrFormExists) {
                    throw new HttpException('NcrForm not found', HttpStatus.NOT_FOUND);
                }
            }

            const updatedNcrReply = await this.prismaService.ncrReply.update({
                where: {
                    ncrReply_id: +ncrReply_id,
                },
                data: { ...data },
            });

            return updatedNcrReply;
        } catch (error) {
            throw new HttpException(error.message || 'Error updating NcrReply', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteNcrReply(ncrReply_id: string) {
        try {
            const ncrReplyExists = await this.prismaService.ncrReply.findUnique({
                where: {
                    ncrReply_id: +ncrReply_id,
                },
            });

            if (!ncrReplyExists) {
                throw new HttpException('NcrReply not found', HttpStatus.NOT_FOUND);
            }

            await this.prismaService.ncrReply.delete({
                where: {
                    ncrReply_id: +ncrReply_id,
                },
            });

            return { success: true };
        } catch (error) {
            throw new HttpException(error.message || 'Error deleting NcrReply', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
