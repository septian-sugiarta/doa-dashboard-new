import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrViewDgcaFormComponent } from './ncr-view-dgca-form.component';

describe('NcrViewDgcaFormComponent', () => {
  let component: NcrViewDgcaFormComponent;
  let fixture: ComponentFixture<NcrViewDgcaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrViewDgcaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcrViewDgcaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
