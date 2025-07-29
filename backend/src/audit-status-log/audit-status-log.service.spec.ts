import { Test, TestingModule } from '@nestjs/testing';
import { AuditStatusLogService } from './audit-status-log.service';

describe('AuditStatusLogService', () => {
  let service: AuditStatusLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditStatusLogService],
    }).compile();

    service = module.get<AuditStatusLogService>(AuditStatusLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
