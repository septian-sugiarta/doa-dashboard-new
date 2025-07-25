import { TestBed } from '@angular/core/testing';

import { IorFormService } from './ior-form.service';

describe('IorFormService', () => {
  let service: IorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IorFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
