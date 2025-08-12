import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreateNcrFormDto {
    RegulationBased: string;
    Subject: string;
    Audit_Plan_No: string;
    NCR_nbr: string;
    Issued_date: Date;
    Responsible_Office: string;
    times_occurred: string;
    Audit_Type: string;
    Audit_scope: string;
    To_UIC: string;
    Attention: string;
    Required_condition_reff: string;
    Level_of_Finding: string;
    implementation_date: Date;
    Problem_Analysis: string;
    Answer_due_date: Date;
    Issue_IAN: string;
    IAN_nbr: string;
    Encountered_Condition: string;
    Audited_by: string;
    Audit_Date: Date;
    Acknowledge_by: string;
    Acknowledge_date: Date;
    Status: string;
    Remark: string;
}

interface UpdateNcrFormDto {
    RegulationBased?: string;
    Subject?: string;
    Audit_Plan_No?: string;
    NCR_nbr?: string;
    Issued_date?: Date;
    Responsible_Office?: string;
    times_occurred?: string;
    Audit_Type?: string;
    Audit_scope?: string;
    To_UIC?: string;
    Attention?: string;
    Required_condition_reff?: string;
    Level_of_Finding?: string;
    implementation_date?: Date;
    Problem_Analysis?: string;
    Answer_due_date?: Date;
    Issue_IAN?: string;
    IAN_nbr?: string;
    Encountered_Condition?: string;
    Audited_by?: string;
    Audit_Date?: Date;
    Acknowledge_by?: string;
    Acknowledge_date?: Date;
    Status?: string;
    Remark?: string;
}


@Injectable()
export class NcrFormService {
    constructor(private readonly prismaService: PrismaService) { }

    async createNcrForm(data: CreateNcrFormDto) {
        try {
            const ncrForm = await this.prismaService.ncrForm.create({
                data: {
                    ...data,
                },
            });
            return ncrForm;
        } catch (error) {
            console.error('Error creating NcrForm:', error);
            throw error;
        }
    }

    async getNcrForms(keyword?: string) {
        try {
            if (keyword) {
                const parsedDate = new Date(keyword);
                const isValidDate = !isNaN(parsedDate.getTime());

                return await this.prismaService.ncrForm.findMany({
                    where: {
                        OR: [
                            {RegulationBased: {contains: keyword}},
                            {NCR_nbr: {contains: keyword}},
                            {To_UIC: {contains: keyword}},
                            ...(isValidDate? [{
                                Answer_due_date: {
                                    equals: parsedDate
                                }
                            }]: []),
                        ]
                    },
                    include: {
                        NvsForms: true,
                    }
                });
            }
            
            return await this.prismaService.ncrForm.findMany({
                include: {NvsForms: true}
            });
        } catch (error) {
            console.error('Error fetching NcrForms:', error);
            throw error;
        }
    }

    async getNcrForm(NCR_init_ID: string) {
        try {
            return await this.prismaService.ncrForm.findUnique({
                where: {
                    NCR_init_ID: +NCR_init_ID,
                },
            });
        } catch (error) {
            console.error('Error fetching NcrForm:', error);
            throw error;
        }
    }

    async updateNcrForm(NCR_init_ID: string, data: UpdateNcrFormDto) {
        try {
            return await this.prismaService.ncrForm.update({
                where: {
                    NCR_init_ID: +NCR_init_ID,
                },
                data: {
                    ...data,
                },
            });
        } catch (error) {
            console.error('Error updating NcrForm:', error);
            throw error;
        }
    }

    async deleteNcrForm(NCR_init_ID: number) {
        try {
            const ncrForm = await this.prismaService.ncrForm.findUnique({
                where: {
                    NCR_init_ID: NCR_init_ID,
                },
            });

            if (!ncrForm) {
                throw new Error('NcrForm not found');
            }

            return await this.prismaService.ncrForm.delete({
                where: {
                    NCR_init_ID: NCR_init_ID,
                },
            });
        } catch (error) {
            console.error('Error deleting NcrForm:', error);
            throw error;
        }
    }
}
