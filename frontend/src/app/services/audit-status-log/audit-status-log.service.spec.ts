import { TestBed } from '@angular/core/testing';

import { AuditStatusLogService } from './audit-status-log.service';

describe('AuditStatusLogService', () => {
  let service: AuditStatusLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditStatusLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
