import { Test, TestingModule } from '@nestjs/testing';
import { NcrFormService } from './ncr-form.service';

describe('NcrFormService', () => {
  let service: NcrFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NcrFormService],
    }).compile();

    service = module.get<NcrFormService>(NcrFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
