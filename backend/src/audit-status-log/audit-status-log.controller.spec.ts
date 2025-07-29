import { Test, TestingModule } from '@nestjs/testing';
import { AuditStatusLogController } from './audit-status-log.controller';

describe('AuditStatusLogController', () => {
  let controller: AuditStatusLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditStatusLogController],
    }).compile();

    controller = module.get<AuditStatusLogController>(AuditStatusLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
