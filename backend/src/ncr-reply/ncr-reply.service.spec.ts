import { Test, TestingModule } from '@nestjs/testing';
import { NcrReplyService } from './ncr-reply.service';

describe('NcrReplyService', () => {
  let service: NcrReplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NcrReplyService],
    }).compile();

    service = module.get<NcrReplyService>(NcrReplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
