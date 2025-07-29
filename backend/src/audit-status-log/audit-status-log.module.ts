import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuditStatusLogController } from './audit-status-log.controller';
import { AuditStatusLogService } from './audit-status-log.service';

@Module({
    imports: [EmailModule, PrismaModule],
    controllers: [AuditStatusLogController],
    providers: [AuditStatusLogService],
})
export class AuditStatusLogModule { }
