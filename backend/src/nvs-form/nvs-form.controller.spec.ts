import { Test, TestingModule } from '@nestjs/testing';
import { NvsFormController } from './nvs-form.controller';

describe('NvsFormController', () => {
  let controller: NvsFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NvsFormController],
    }).compile();

    controller = module.get<NvsFormController>(NvsFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
