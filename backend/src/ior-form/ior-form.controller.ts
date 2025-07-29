import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { IorFormService } from './ior-form.service';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';

interface CreateIorFormDto {
    subject_ior: string;
    occur_nbr: string;
    occur_date: Date;
    reference_ior: string;
    to_uic: string;
    cc_uic: string;
    category_occur: string;
    type_or_pnbr: string;
    level_type: string[];
    detail_occurance: string;
    Reportedby: string;
    reporter_uic: string;
    report_date: Date;
    reporter_identity: string[];
    data_reference: string[];
    hirac_process: string[];
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

@UseGuards(AuthGuard)
@Controller('ior-form')
export class IorFormController {
    constructor(private prisma: PrismaService,
        private iorFormService: IorFormService
    ) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get()
    async getIorForms(@Query('keyword') keyword?: string) {
        try {
            if (keyword) {
                return await this.iorFormService.getIorForms(keyword);
            }
            return await this.iorFormService.getIorForms();
        } catch (error) {
            throw new HttpException('Error fetching IorForms', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Post()
    async createIorForm(@Body() iorForm: CreateIorFormDto) {
        try {
            await this.iorFormService.createIorForm({
                ...iorForm,
                occur_date: new Date(iorForm.occur_date),
                report_date: new Date(iorForm.report_date),
                level_type: Array.isArray(iorForm.level_type) ? JSON.stringify(iorForm.level_type) : '[]',
                reporter_identity: Array.isArray(iorForm.reporter_identity) ? JSON.stringify(iorForm.reporter_identity) : '[]',
                data_reference: Array.isArray(iorForm.data_reference) ? JSON.stringify(iorForm.data_reference) : '[]',
                hirac_process: Array.isArray(iorForm.hirac_process) ? JSON.stringify(iorForm.hirac_process) : '[]'
            });

            return { success: true };
        } catch (error) {
            console.error('Error creating IorForm:', error);
            throw new HttpException('Error creating IorForm', 500);
        }
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Put(':id_IOR')
    async updateIorForm(@Param('id_IOR') id_IOR: string, @Body() iorForm: UpdateIorFormDto) {
        try {
            await this.iorFormService.updateIorForm(id_IOR, {
                ...iorForm,
                occur_date: iorForm.occur_date ? new Date(iorForm.occur_date) : undefined,
                report_date: iorForm.report_date ? new Date(iorForm.report_date) : undefined,
            });
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error updating IorForm', 500);
        }
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get(':id_IOR')
    async getIorForm(@Param('id_IOR') id_IOR: string) {
        try {
            const iorForm = await this.iorFormService.getIorForm(id_IOR);
            if (!iorForm) {
                throw new HttpException('IorForm not found', 404);
            }
            return iorForm;
        } catch (error) {
            throw new HttpException('Error fetching IorForm', 500);
        }
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Delete(':id_IOR')
    async deleteIorForm(@Param('id_IOR') id_IOR: string) {
        try {
            const iorForm = await this.iorFormService.getIorForm(id_IOR);
            if (!iorForm) {
                throw new HttpException('IorForm not found', 404);
            }

            await this.iorFormService.deleteIorForm(id_IOR);
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error deleting IorForm', 500);
        }
    }

}
