import { Test, TestingModule } from '@nestjs/testing';
import { NvsFormService } from './nvs-form.service';

describe('NvsFormService', () => {
  let service: NvsFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NvsFormService],
    }).compile();

    service = module.get<NvsFormService>(NvsFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
