import { Module } from '@nestjs/common';
import { NvsFormController } from './nvs-form.controller';
import { NvsFormService } from './nvs-form.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [NvsFormController],
  providers: [NvsFormService, PrismaService]
})
export class NvsFormModule {}
