import { Test, TestingModule } from '@nestjs/testing';
import { ActionLogController } from './action-log.controller';

describe('ActionLogController', () => {
  let controller: ActionLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionLogController],
    }).compile();

    controller = module.get<ActionLogController>(ActionLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
