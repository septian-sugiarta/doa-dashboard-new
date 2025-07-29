import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NcrReplyController } from './ncr-reply.controller';
import { NcrReplyService } from './ncr-reply.service';

@Module({
    imports: [EmailModule, PrismaModule],
    controllers: [NcrReplyController],
    providers: [NcrReplyService],
})
export class NcrReplyModule { }
