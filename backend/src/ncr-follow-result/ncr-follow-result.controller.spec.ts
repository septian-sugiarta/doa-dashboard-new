import { Test, TestingModule } from '@nestjs/testing';
import { NcrFollowResultController } from './ncr-follow-result.controller';

describe('NcrFollowResultController', () => {
  let controller: NcrFollowResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NcrFollowResultController],
    }).compile();

    controller = module.get<NcrFollowResultController>(NcrFollowResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
