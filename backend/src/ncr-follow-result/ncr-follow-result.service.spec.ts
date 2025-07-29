import { Test, TestingModule } from '@nestjs/testing';
import { NcrFollowResultService } from './ncr-follow-result.service';

describe('NcrFollowResultService', () => {
  let service: NcrFollowResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NcrFollowResultService],
    }).compile();

    service = module.get<NcrFollowResultService>(NcrFollowResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
