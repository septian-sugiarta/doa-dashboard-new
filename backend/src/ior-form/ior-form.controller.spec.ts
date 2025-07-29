import { Test, TestingModule } from '@nestjs/testing';
import { IorFormController } from './ior-form.controller';

describe('IorFormController', () => {
  let controller: IorFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IorFormController],
    }).compile();

    controller = module.get<IorFormController>(IorFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
