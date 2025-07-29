import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "src/prisma/prisma.module";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";


@Module({
  imports: [ConfigModule, PrismaModule],
  exports: [EmailService],
  controllers: [EmailController],
  providers: [EmailService]

})
export class EmailModule { }
