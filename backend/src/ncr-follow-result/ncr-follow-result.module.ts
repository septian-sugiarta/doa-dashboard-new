import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NcrFollowResultController } from './ncr-follow-result.controller';
import { NcrFollowResultService } from './ncr-follow-result.service';

@Module({
    imports: [EmailModule, PrismaModule],
    controllers: [NcrFollowResultController],
    providers: [NcrFollowResultService],
})
export class NcrFollowResultModule { }
