import { TestBed } from '@angular/core/testing';
import { NcrFormService } from './ncr-form.service';



describe('NcrFormService', () => {
  let service: NcrFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NcrFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
