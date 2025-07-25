import { TestBed } from '@angular/core/testing';

import { IorFollowOnService } from './ior-follow-on.service';

describe('IorFollowOnService', () => {
  let service: IorFollowOnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IorFollowOnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
