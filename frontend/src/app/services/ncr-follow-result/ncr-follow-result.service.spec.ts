import { TestBed } from '@angular/core/testing';

import { NcrFollowResultService } from './ncr-follow-result.service';

describe('NcrFollowResultService', () => {
  let service: NcrFollowResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NcrFollowResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
