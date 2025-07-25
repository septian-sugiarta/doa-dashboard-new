import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvsPreviewComponent } from './nvs-preview.component';

describe('NvsPreviewComponent', () => {
  let component: NvsPreviewComponent;
  let fixture: ComponentFixture<NvsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NvsPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NvsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
