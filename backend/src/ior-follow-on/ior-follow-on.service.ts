import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreateIorFollowOnDto {
    follup_detail: string;
    follupby: string;
    follup_uic: string;
    follup_date: Date;
    follup_datarefer: string;
    follup_status: string;
    nextuic_follup: string;
    current_probability: string;
    current_severity: string;
    current_riskindex: string;
    iorId: number;
}

interface UpdateIorFollowOnDto {
    follup_detail?: string;
    follupby?: string;
    follup_uic?: string;
    follup_date?: Date;
    follup_datarefer?: string;
    follup_status?: string;
    nextuic_follup?: string;
    current_probability?: string;
    current_severity?: string;
    current_riskindex?: string;
    iorId?: number;
}

@Injectable()
export class IorFollowOnService {
    constructor(private readonly prismaService: PrismaService) { }

    async createIorFollowOn(data: CreateIorFollowOnDto) {
        try {
            const iorFormExists = await this.prismaService.iorForm.findUnique({
                where: { id_IOR: data.iorId },
            });

            if (!iorFormExists) {
                throw new HttpException('IorForm not found', HttpStatus.NOT_FOUND);
            }

            const iorFollowOn = await this.prismaService.iorFollowOn.create({
                data: {
                    follup_detail: data.follup_detail,
                    follupby: data.follupby,
                    follup_uic: data.follup_uic,
                    follup_date: new Date(data.follup_date),
                    follup_datarefer: data.follup_datarefer,
                    follup_status: data.follup_status,
                    nextuic_follup: data.nextuic_follup,
                    current_probability: data.current_probability,
                    current_severity: data.current_severity,
                    current_riskindex: data.current_riskindex,
                    iorId: data.iorId,
                },
            });

            return iorFollowOn;
        } catch (error) {
            throw new HttpException(error.message || 'Error creating IorFollowOn', HttpStatus.BAD_REQUEST);
        }
    }

    async getIorFollowOns() {
        try {
            return await this.prismaService.iorFollowOn.findMany();
        } catch (error) {
            throw new HttpException('Error fetching IorFollowOns', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getIorFollowOn(iorFollowOn_id: string) {
        try {
            const iorFollowOn = await this.prismaService.iorFollowOn.findUnique({
                where: {
                    iorFollowOn_id: +iorFollowOn_id, 
                },
            });

            if (!iorFollowOn) {
                throw new HttpException('IorFollowOn not found', HttpStatus.NOT_FOUND);
            }

            return iorFollowOn;
        } catch (error) {
            throw new HttpException(error.message || 'Error fetching IorFollowOn', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async updateIorFollowOn(iorFollowOn_id: string, data: UpdateIorFollowOnDto) {
        try {
            const iorFollowOnExists = await this.prismaService.iorFollowOn.findUnique({
                where: { iorFollowOn_id: +iorFollowOn_id },
            });

            if (!iorFollowOnExists) {
                throw new HttpException('IorFollowOn not found', HttpStatus.NOT_FOUND);
            }

            if (data.iorId) {
                const iorFormExists = await this.prismaService.iorForm.findUnique({
                    where: { id_IOR: data.iorId },
                });

                if (!iorFormExists) {
                    throw new HttpException('IorForm not found', HttpStatus.NOT_FOUND);
                }
            }

            const updatedIorFollowOn = await this.prismaService.iorFollowOn.update({
                where: {
                    iorFollowOn_id: +iorFollowOn_id,
                },
                data: { ...data },
            });

            return updatedIorFollowOn;
        } catch (error) {
            throw new HttpException(error.message || 'Error updating IorFollowOn', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteIorFollowOn(iorFollowOn_id: string) {
        try {
            const iorFollowOnExists = await this.prismaService.iorFollowOn.findUnique({
                where: {
                    iorFollowOn_id: +iorFollowOn_id,
                },
            });

            if (!iorFollowOnExists) {
                throw new HttpException('IorFollowOn not found', HttpStatus.NOT_FOUND);
            }

            await this.prismaService.iorFollowOn.delete({
                where: {
                    iorFollowOn_id: +iorFollowOn_id,
                },
            });

            return { success: true };
        } catch (error) {
            throw new HttpException(error.message || 'Error deleting IorFollowOn', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
