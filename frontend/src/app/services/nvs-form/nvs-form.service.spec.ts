import { TestBed } from '@angular/core/testing';
import { NvsFormService } from './nvs-form.service';

describe('NvsFormService', () => {
  let service: NvsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NvsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
