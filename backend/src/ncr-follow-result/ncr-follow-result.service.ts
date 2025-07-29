import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

@Injectable()
export class NcrFollowResultService {
    constructor(private readonly prismaService: PrismaService) { }

    async createNcrFollowResult(data: CreateNcrFollowResultDto) {
        try {
            const ncrFormExists = await this.prismaService.ncrForm.findUnique({
                where: { NCR_init_ID: data.ncrId },
            });

            if (!ncrFormExists) {
                throw new HttpException('NcrForm not found', HttpStatus.NOT_FOUND);
            }

            const ncrReplyExists = await this.prismaService.ncrReply.findUnique({
                where: { ncrReply_id: data.ncrReplyId },
            });

            if (!ncrReplyExists) {
                throw new HttpException('NcrReply not found', HttpStatus.NOT_FOUND);
            }

            const ncrFollowResult = await this.prismaService.ncrFollowResult.create({
                data: {
                    Close_Corrective_Actions: data.Close_Corrective_Actions,
                    Proposed_Close_Auditee: data.Proposed_Close_Auditee,
                    Proposed_Close_Date: new Date(data.Proposed_Close_Date),
                    Implemented_close_date: new Date(data.Implemented_close_date),
                    Is_close: data.Is_close,
                    effectiveness: data.effectiveness,
                    Refer_to_Verify_Sheet: data.Refer_to_Verify_Sheet,
                    Sheet_No: data.Sheet_No,
                    New_NCR_Issue_nbr: data.New_NCR_Issue_nbr,
                    Close_approved_by: data.Close_approved_by,
                    Close_approved_date: new Date(data.Close_approved_date),
                    Verified_Chief_IM: data.Verified_Chief_IM,
                    Verified_Date: new Date(data.Verified_Date),
                    followup_audit_result: data.followup_audit_result,
                    evidence: data.evidence,
                    ncrId: data.ncrId,
                    ncrReplyId: data.ncrReplyId,
                },
            });

            return ncrFollowResult;
        } catch (error) {
            throw new HttpException(error.message || 'Error creating NcrFollowResult', HttpStatus.BAD_REQUEST);
        }
    }

    async getNcrFollowResults() {
        try {
            return await this.prismaService.ncrFollowResult.findMany();
        } catch (error) {
            throw new HttpException('Error fetching NcrReplies', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getNcrFollowResult(ncrFollowResult_id: string) {
        try {
            const ncrFollowResult = await this.prismaService.ncrFollowResult.findUnique({
                where: {
                    ncrFollowResult_id: + ncrFollowResult_id, 
                },
            });

            if (!ncrFollowResult) {
                throw new HttpException('ncrFollowResult not found', HttpStatus.NOT_FOUND);
            }

            return ncrFollowResult;
        } catch (error) {
            throw new HttpException(error.message || 'Error fetching NcrFollowResult', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateNcrFollowResult(ncrFollowResult_id: string, data: UpdateNcrFollowResultDto) {
        try {
            const ncrFollowResultExists = await this.prismaService.ncrFollowResult.findUnique({
                where: {
                    ncrFollowResult_id: + ncrFollowResult_id, 
                },
            });


            if (!ncrFollowResultExists) {
                throw new HttpException('NcrFollowResult not found', HttpStatus.NOT_FOUND);
            }

            if (data.ncrId) {
                const ncrFormExists = await this.prismaService.ncrForm.findUnique({
                    where: { NCR_init_ID: data.ncrId },
                });

                if (!ncrFormExists) {
                    throw new HttpException('NcrForm not found', HttpStatus.NOT_FOUND);
                }
            }


            const updatedNcrFollowResult = await this.prismaService.ncrFollowResult.update({
                where: {
                    ncrFollowResult_id: + ncrFollowResult_id,
                },
                data: {
                    ...data
                },
            });

            return updatedNcrFollowResult;
        } catch (error) {
            throw new HttpException(error.message || 'Error updating NcrFollowResult', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteNcrFollowResult(ncrFollowResult_id: string) {
        try {
            const ncrFollowResultExists = await this.prismaService.ncrFollowResult.findUnique({
                where: {
                    ncrFollowResult_id: + ncrFollowResult_id,
                },
            });

            if (!ncrFollowResultExists) {
                throw new HttpException('NcrFollowResult not found', HttpStatus.NOT_FOUND);
            }

            await this.prismaService.ncrFollowResult.delete({
                where: {
                    ncrFollowResult_id: + ncrFollowResult_id,
                },
            });

            return { success: true };
        } catch (error) {
            throw new HttpException(error.message || 'Error deleting NcrFollowResult', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
