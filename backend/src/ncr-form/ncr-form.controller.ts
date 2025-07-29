import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NcrFormService } from './ncr-form.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { EmailService } from 'src/email/email.service';

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

@UseGuards(AuthGuard, RolesGuard)
@Controller('ncr-form')
export class NcrFormController {
    constructor(private prisma: PrismaService, private ncrFormService: NcrFormService, private emailService: EmailService) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get()
    async getNcrForms(@Query('keyword') keyword?: string) {
        try {
            if (keyword) {
                return await this.ncrFormService.getNcrForms(keyword);
            }
            return await this.ncrFormService.getNcrForms();
        } catch (error) {
            throw new HttpException('Error fetching NcrForms', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Post()
    async createNcrForm(@Body() ncrForm: CreateNcrFormDto) {
        try {
            const createdNcrForm = await this.ncrFormService.createNcrForm({
                ...ncrForm,
                implementation_date: new Date(ncrForm.implementation_date),
                Issued_date: new Date(ncrForm.Issued_date),
                Answer_due_date: new Date(ncrForm.Answer_due_date),
                Audit_Date: new Date(ncrForm.Audit_Date),
                Acknowledge_date: new Date(ncrForm.Acknowledge_date),
            });
            await this.emailService.sendAcknowledgementEmail(createdNcrForm.NCR_init_ID.toString());
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error creating NcrForm', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Put(':NCR_init_ID')
    async updateNcrForm(
        @Param('NCR_init_ID') NCR_init_ID: string,
        @Body() ncrForm: UpdateNcrFormDto
    ) {
        try {
            await this.ncrFormService.updateNcrForm(NCR_init_ID, {
                ...ncrForm,
                Issued_date: ncrForm.Issued_date ? new Date(ncrForm.Issued_date) : undefined,
                Answer_due_date: ncrForm.Answer_due_date ? new Date(ncrForm.Answer_due_date) : undefined,
                Audit_Date: ncrForm.Audit_Date ? new Date(ncrForm.Audit_Date) : undefined,
                Acknowledge_date: ncrForm.Acknowledge_date ? new Date(ncrForm.Acknowledge_date) : undefined,
            });
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error updating NcrForm', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM, Role.DO, Role.AO, Role.HDO, Role.DEA)
    @Get(':NCR_init_ID')
    async getNcrForm(@Param('NCR_init_ID') NCR_init_ID: string) {
        try {
            const ncrForm = await this.ncrFormService.getNcrForm(NCR_init_ID);
            if (!ncrForm) {
                throw new HttpException('NcrForm not found', 404);
            }
            return ncrForm;
        } catch (error) {
            throw new HttpException('Error fetching NcrForm', 500);
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.IM)
    @Delete(':NCR_init_ID')
    async deleteNcrForm(@Param('NCR_init_ID') NCR_init_ID: string) {
        try {
            const ncrForm = await this.ncrFormService.getNcrForm(NCR_init_ID);
            if (!ncrForm) {
                throw new HttpException('NcrForm not found', 404);
            }

            await this.ncrFormService.deleteNcrForm(Number(NCR_init_ID));
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error deleting NcrForm', 500);
        }
    }

}
