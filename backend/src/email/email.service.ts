import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { sendEmailDto } from 'src/email/dto/email.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailService {
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
    ) { }

    emailTransport() {
        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('SMTP_EMAIL_HOST'),
            port: this.configService.get<number>('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.configService.get<string>('SMTP_EMAIL_USER'),
                pass: this.configService.get<string>('SMTP_EMAIL_PASSWORD'),
            },
        });

        return transporter;
    }

    async getEmailByName(name: string): Promise<string | null> {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    name: name,
                },
            });

            return user ? user.email : null;
        } catch (error) {
            console.error('Error while fetching email by name:', error);
            throw new Error('Failed to fetch email');
        }
    }

    async sendAcknowledgementEmail(NCR_init_ID: string) {
        try {
            const ncrForm = await this.prisma.ncrForm.findUnique({
                where: { NCR_init_ID: +NCR_init_ID },
            });

            if (!ncrForm) {
                throw new Error(`NCR Form with ID ${NCR_init_ID} not found.`);
            }

            const { Acknowledge_by } = ncrForm;

            const email = await this.getEmailByName(Acknowledge_by);

            if (email) {
                const NCR_nbr = ncrForm.NCR_nbr;
                const subject = `Notifikasi: NCR No ${NCR_nbr} perlu Anda ditindaklanjuti`;
                const html = `<p>Halo ${Acknowledge_by},</p><p>Data NCR No ${NCR_nbr} telah dibuat dan harap ditindaklanjuti sesuai batas waktu yang telah ditentukan.</p>`;

                await this.sendEmail({
                    recipients: [email],
                    subject: subject,
                    html: html,
                });
                console.log('Email sent successfully to:', email);
            } else {
                console.log(`User with name ${Acknowledge_by} not found`);
            }
        } catch (error) {
            console.error('Error sending acknowledgement email:', error);
            throw error;
        }
    }

    async sendAuditorAcceptedEmail(ncrReply_id: string) {
        try {
            const ncrReply = await this.prisma.ncrReply.findUnique({
                where: { ncrReply_id: +ncrReply_id },
            });

            if (!ncrReply) {
                throw new Error(`NCR Reply with ID ${ncrReply_id} not found.`);
            }

            const { Accept_by_Auditor } = ncrReply;

            const email = await this.getEmailByName(Accept_by_Auditor);

            if (email) {
                const subject = 'Notifikasi: NCR Reply Diterima';
                const html = `<p>Halo ${Accept_by_Auditor},</p><p>Data NCR Reply Anda telah berhasil diterima dan sedang diproses.</p>`;

                await this.sendEmail({
                    recipients: [email],
                    subject: subject,
                    html: html,
                });
                console.log('Email sent successfully to:', email);
            } else {
                console.log(`User with name ${Accept_by_Auditor} not found`);
            }
        } catch (error) {
            console.error('Error sending Auditor accepted email:', error);
            throw error;
        }
    }

    async sendVerifiedIMEmail(ncrFollowResult_id: string) {
        try {
            const ncrFollowResult = await this.prisma.ncrFollowResult.findUnique({
                where: { ncrFollowResult_id: +ncrFollowResult_id },
            });

            if (!ncrFollowResult) {
                throw new Error(`NCR Form with ID ${ncrFollowResult_id} not found.`);
            }

            const { Verified_Chief_IM } = ncrFollowResult;

            const email = await this.getEmailByName(Verified_Chief_IM);

            if (email) {
                const subject = 'Notifikasi: NCR Form Diterima';
                const html = `<p>Halo ${Verified_Chief_IM},</p><p>Data NCR Form Anda telah berhasil diterima dan sedang diproses.</p>`;

                await this.sendEmail({
                    recipients: [email],
                    subject: subject,
                    html: html,
                });
                console.log('Email sent successfully to:', email);
            } else {
                console.log(`User with name ${Verified_Chief_IM} not found`);
            }
        } catch (error) {
            console.error('Error sending acknowledgement email:', error);
            throw error;
        }
    }
    async sendCheckedByEmail(auditStatusLog_id: string) {
        try {
            const auditStatusLog = await this.prisma.auditStatusLog.findUnique({
                where: { auditStatusLog_id: +auditStatusLog_id },
            });

            if (!auditStatusLog) {
                throw new Error(`NCR Form with ID ${auditStatusLog_id} not found.`);
            }

            const { checked_by } = auditStatusLog;

            const email = await this.getEmailByName(checked_by);

            if (email) {
                const subject = 'Notifikasi: NCR Form Diterima';
                const html = `<p>Halo ${checked_by},</p><p>Data NCR Form Anda telah berhasil diterima dan sedang diproses.</p>`;

                await this.sendEmail({
                    recipients: [email],
                    subject: subject,
                    html: html,
                });
                console.log('Email sent successfully to:', email);
            } else {
                console.log(`User with name ${checked_by} not found`);
            }
        } catch (error) {
            console.error('Error sending acknowledgement email:', error);
            throw error;
        }
    }

    async sendEmail(dto: sendEmailDto) {
        const { recipients, subject, html } = dto;

        const transport = this.emailTransport();

        const options: nodemailer.SendMailOptions = {
            from: this.configService.get<string>('SMTP_EMAIL_USER'),
            to: recipients,
            subject: subject,
            html: html,
        };

        try {
            await transport.sendMail(options);
            console.log('Email sent successfully');
            console.log('Email sent to: ', recipients);
        } catch (error) {
            console.log('Error sending mail: ', error);
        }
    }
}
