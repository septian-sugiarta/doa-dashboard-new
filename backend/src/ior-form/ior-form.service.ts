import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreateIorFormDto {
    subject_ior: string;
    occur_nbr: string;
    occur_date: Date;
    reference_ior: string;
    to_uic: string;
    cc_uic: string;
    category_occur: string;
    type_or_pnbr: string;
    level_type: string;
    detail_occurance: string;
    Reportedby: string;
    reporter_uic: string;
    report_date: Date;
    reporter_identity: string;
    data_reference: string;
    hirac_process: string;
    Initial_probability: string;
    initial_severity: string;
    initial_riskindex: string;
}

interface UpdateIorFormDto {
    subject_ior?: string;
    occur_nbr?: string;
    occur_date?: Date;
    reference_ior?: string;
    to_uic?: string;
    cc_uic?: string;
    category_occur?: string;
    type_or_pnbr?: string;
    level_type?: string;
    detail_occurance?: string;
    Reportedby?: string;
    reporter_uic?: string;
    report_date?: Date;
    reporter_identity?: string;
    data_reference?: string;
    hirac_process?: string;
    Initial_probability?: string;
    initial_severity?: string;
    initial_riskindex?: string;
}


@Injectable()
export class IorFormService {
    constructor(private readonly prismaService: PrismaService) { }

    async createIorForm(data: CreateIorFormDto) {
        try {
            const iorForm = await this.prismaService.iorForm.create({
                data: {
                    ...data,
                },
            });
            return iorForm;
        } catch (error) {
            console.error('Error creating IorForm:', error);
            throw error;
        }
    }


    async getIorForms(keyword?: string) {
        try {
            if (keyword) {
                const parsedDate = new Date(keyword);
                const isValidDate = !isNaN(parsedDate.getTime());

                return await this.prismaService.iorForm.findMany({
                    where: {
                        OR: [
                            {
                                subject_ior: {
                                    contains: keyword,
                                },
                            },
                            {
                                occur_nbr: {
                                    contains: keyword,
                                },
                            },
                            ...(isValidDate
                                ? [
                                    {
                                        occur_date: {
                                            equals: parsedDate,
                                        },
                                    },
                                ]
                                : []),
                            {
                                to_uic: {
                                    contains: keyword,
                                },
                            },

                        ],
                    },
                });
            }
            return await this.prismaService.iorForm.findMany();
        } catch (error) {
            console.error('Error fetching IorForms:', error);
            throw error;
        }
    }


    async getIorForm(id_IOR: string) {
        try {
            return await this.prismaService.iorForm.findUnique({
                where: {
                    id_IOR: +id_IOR,
                },
            });
        } catch (error) {
            console.error('Error fetching IorForm:', error);
            throw error;
        }
    }


    async updateIorForm(id_IOR: string, data: UpdateIorFormDto) {
        try {
            return await this.prismaService.iorForm.update({
                where: {
                    id_IOR: +id_IOR,
                },
                data: {
                    ...data,
                },
            });
        } catch (error) {
            console.error('Error updating IorForm:', error);
            throw error;
        }
    }


    async deleteIorForm(id_IOR: string) {
        try {
            const iorForm = await this.prismaService.iorForm.findUnique({
                where: {
                    id_IOR: +id_IOR,
                },
            });

            if (!iorForm) {
                throw new Error('NcrForm not found');
            }

            return await this.prismaService.iorForm.delete({
                where: {
                    id_IOR: +id_IOR,
                },
            });
        } catch (error) {
            console.error('Error deleting IorForm:', error);
            throw error;
        }
    }
}
