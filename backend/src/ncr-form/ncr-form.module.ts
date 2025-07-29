import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NcrFormController } from './ncr-form.controller';
import { NcrFormService } from './ncr-form.service';

@Module({
    imports: [EmailModule, PrismaModule], 
    controllers: [NcrFormController],
    providers: [NcrFormService],
})
export class NcrFormModule { }
