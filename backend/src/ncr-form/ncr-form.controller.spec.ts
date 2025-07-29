import { Test, TestingModule } from '@nestjs/testing';
import { NcrFormController } from './ncr-form.controller';

describe('NcrFormController', () => {
  let controller: NcrFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NcrFormController],
    }).compile();

    controller = module.get<NcrFormController>(NcrFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
