import { Test, TestingModule } from '@nestjs/testing';
import { IorFollowOnController } from './ior-follow-on.controller';

describe('IorFollowOnController', () => {
  let controller: IorFollowOnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IorFollowOnController],
    }).compile();

    controller = module.get<IorFollowOnController>(IorFollowOnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
