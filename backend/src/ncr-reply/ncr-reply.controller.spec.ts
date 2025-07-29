import { Test, TestingModule } from '@nestjs/testing';
import { NcrReplyController } from './ncr-reply.controller';

describe('NcrReplyController', () => {
  let controller: NcrReplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NcrReplyController],
    }).compile();

    controller = module.get<NcrReplyController>(NcrReplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
