import { TestBed } from '@angular/core/testing';

import { NcrReplyService } from './ncr-reply.service';

describe('NcrReplyService', () => {
  let service: NcrReplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NcrReplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
