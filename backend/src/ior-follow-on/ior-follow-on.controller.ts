import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { IorFollowOnService } from './ior-follow-on.service';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';

interface CreateIorFollowOnDto {
    follup_detail: string;
    follupby: string;
    follup_uic: string;
    follup_date: Date;
    follup_datarefer: string[];
    follup_status: string[];
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
    follup_datarefer?: string[];
    follup_status?: string[];
    nextuic_follup?: string;
    current_probability?: string;
    current_severity?: string;
    current_riskindex?: string;
    iorId?: number;
}

@UseGuards(AuthGuard)
@Controller('ior-follow-on')
export class IorFollowOnController {
    constructor(private prisma: PrismaService, private iorFollowOnService: IorFollowOnService) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get()
    async getIorFollowOns() {
        try {
            return await this.iorFollowOnService.getIorFollowOns();
        } catch (error) {
            throw new HttpException('Error fetching IorFollowOns', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Post()
    async createIorFollowOn(@Body() iorFollowOn: CreateIorFollowOnDto) {
        try {
            await this.iorFollowOnService.createIorFollowOn({
                follup_detail: iorFollowOn.follup_detail,
                follupby: iorFollowOn.follupby,
                follup_uic: iorFollowOn.follup_uic,
                follup_date: new Date(iorFollowOn.follup_date),
                follup_datarefer: Array.isArray(iorFollowOn.follup_datarefer) ? JSON.stringify(iorFollowOn.follup_datarefer) : '[]',
                follup_status: Array.isArray(iorFollowOn.follup_status) ? JSON.stringify(iorFollowOn.follup_status) : '[]',
                nextuic_follup: iorFollowOn.nextuic_follup,
                current_probability: iorFollowOn.current_probability,
                current_severity: iorFollowOn.current_severity,
                current_riskindex: iorFollowOn.current_riskindex,
                iorId: iorFollowOn.iorId,
            });
            return { success: true };
        } catch (error) {
            throw new HttpException('Error creating IorFollowOn', 500);
        }
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Put(':iorFollowOn_id')
    async updateIorFollowOn(
        @Param('iorFollowOn_id') iorFollowOn_id: string,
        @Body() iorFollowOn: UpdateIorFollowOnDto
    ) {
        try {
            await this.iorFollowOnService.updateIorFollowOn(iorFollowOn_id, {

                follup_detail: iorFollowOn.follup_detail,
                follupby: iorFollowOn.follupby,
                follup_uic: iorFollowOn.follup_uic,
                follup_date: iorFollowOn.follup_date ? new Date(iorFollowOn.follup_date) : undefined,
                follup_datarefer: Array.isArray(iorFollowOn.follup_datarefer) ? JSON.stringify(iorFollowOn.follup_datarefer) : '[]',
                follup_status: Array.isArray(iorFollowOn.follup_status) ? JSON.stringify(iorFollowOn.follup_status) : '[]',
                nextuic_follup: iorFollowOn.nextuic_follup,
                current_probability: iorFollowOn.current_probability,
                current_severity: iorFollowOn.current_severity,
                current_riskindex: iorFollowOn.current_riskindex,
                iorId: iorFollowOn.iorId,
            });
            return { success: true };
        } catch (error) {
            throw new HttpException('Error updating IorFollowOn', 500);
        }
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get(':iorFollowOn_id')
    async getIorFollowOn(@Param('iorFollowOn_id') iorFollowOn_id: string) {
        try {
            const iorFollowOn = await this.iorFollowOnService.getIorFollowOn(iorFollowOn_id);
            if (!iorFollowOn) {
                throw new HttpException('IorFollowOn not found', 404);
            }
            return iorFollowOn;
        } catch (error) {
            throw new HttpException('Error fetching IorFollowOn', 500);
        }
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Delete(':iorFollowOn_id')
    async deleteIorFollowOn(@Param('iorFollowOn_id') iorFollowOn_id: string) {
        try {
            const iorFollowOn = await this.iorFollowOnService.getIorFollowOn(iorFollowOn_id);
            if (!iorFollowOn) {
                throw new HttpException('IorFollowOn not found', 404);
            }

            await this.iorFollowOnService.deleteIorFollowOn(iorFollowOn_id);
            return { success: true };
        } catch (error) {
            throw new HttpException('Error deleting IorFollowOn', 500);
        }
    }
}
