import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersController } from './users/users.controller';
import { NcrFormController } from './ncr-form/ncr-form.controller';
import { NcrReplyController } from './ncr-reply/ncr-reply.controller';
import { NcrFollowResultController } from './ncr-follow-result/ncr-follow-result.controller';
import { IorFormController } from './ior-form/ior-form.controller';
import { IorFollowOnController } from './ior-follow-on/ior-follow-on.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { NcrFormService } from './ncr-form/ncr-form.service';
import { NcrFollowResultService } from './ncr-follow-result/ncr-follow-result.service';
import { NcrReplyService } from './ncr-reply/ncr-reply.service';
import { IorFormService } from './ior-form/ior-form.service';
import { IorFollowOnService } from './ior-follow-on/ior-follow-on.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { AuditPlanController } from './audit-plan/audit-plan.controller';
import { AuditPlanService } from './audit-plan/audit-plan.service';
import { ActionLogService } from './action-log/action-log.service';
import { ActionLogController } from './action-log/action-log.controller';
import { AuditStatusLogController } from './audit-status-log/audit-status-log.controller';
import { AuditStatusLogService } from './audit-status-log/audit-status-log.service';
import { HashingService } from './hashing/hashing.service';
import { NcrFormModule } from './ncr-form/ncr-form.module';
import { NcrReplyModule } from './ncr-reply/ncr-reply.module';
import { NcrFollowResultModule } from './ncr-follow-result/ncr-follow-result.module';
import { AuditStatusLogModule } from './audit-status-log/audit-status-log.module';
import { NvsFormModule } from './nvs-form/nvs-form.module';


@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '50d' }
  }), EmailModule, NcrFormModule, ConfigModule.forRoot(), NcrReplyModule, NcrFollowResultModule, AuditStatusLogModule, NvsFormModule],
  controllers: [AppController, UsersController, NcrFormController, NcrReplyController, NcrFollowResultController, IorFormController, IorFollowOnController, AuthController, AuditPlanController, ActionLogController, AuditStatusLogController],
  providers: [AppService, PrismaService, AuthService, UsersService, NcrFormService, NcrFollowResultService, NcrReplyService, IorFormService, IorFollowOnService, AuditPlanService, ActionLogService, AuditStatusLogService, HashingService],
})
export class AppModule { }
