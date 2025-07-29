import { Test, TestingModule } from '@nestjs/testing';
import { AuditPlanController } from './audit-plan.controller';

describe('AuditPlanController', () => {
  let controller: AuditPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditPlanController],
    }).compile();

    controller = module.get<AuditPlanController>(AuditPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
