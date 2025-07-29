import { Test, TestingModule } from '@nestjs/testing';
import { AuditPlanService } from './audit-plan.service';

describe('AuditPlanService', () => {
  let service: AuditPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditPlanService],
    }).compile();

    service = module.get<AuditPlanService>(AuditPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
