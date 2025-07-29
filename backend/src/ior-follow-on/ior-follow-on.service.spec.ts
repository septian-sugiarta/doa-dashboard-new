import { Test, TestingModule } from '@nestjs/testing';
import { IorFollowOnService } from './ior-follow-on.service';

describe('IorFollowOnService', () => {
  let service: IorFollowOnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IorFollowOnService],
    }).compile();

    service = module.get<IorFollowOnService>(IorFollowOnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
