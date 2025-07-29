import { Test, TestingModule } from '@nestjs/testing';
import { IorFormService } from './ior-form.service';

describe('IorFormService', () => {
  let service: IorFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IorFormService],
    }).compile();

    service = module.get<IorFormService>(IorFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
