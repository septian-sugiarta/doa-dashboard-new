import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrFormComponent } from './ncr-form.component';

describe('NcrFormComponent', () => {
  let component: NcrFormComponent;
  let fixture: ComponentFixture<NcrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
