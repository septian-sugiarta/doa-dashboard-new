import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { sendEmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Post('send')
    async sendAcknowledgementMail(@Body() ncrFormData: any) {
        await this.emailService.sendAcknowledgementEmail(ncrFormData);
        return { message: 'Email sent successfully' };
    }
    @Post('send')
    async sendAuditorAcceptedMail(@Body() ncrReplyData: any) {
        await this.emailService.sendAuditorAcceptedEmail(ncrReplyData);
        return { message: 'Email sent successfully' };
    }
    @Post('send')
    async sendVerifiedIMMail(@Body() ncrFollowResultData: any) {
        await this.emailService.sendVerifiedIMEmail(ncrFollowResultData);
        return { message: 'Email sent successfully' };
    }
    @Post('send')
    async sendCheckedByMail(@Body() auditStatusLogData: any) {
        await this.emailService.sendCheckedByEmail(auditStatusLogData);
        return { message: 'Email sent successfully' };
    }

}
