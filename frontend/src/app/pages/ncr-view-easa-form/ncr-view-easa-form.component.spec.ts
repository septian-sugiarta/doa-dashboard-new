import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrViewEasaFormComponent } from './ncr-view-easa-form.component';

describe('NcrViewEasaFormComponent', () => {
  let component: NcrViewEasaFormComponent;
  let fixture: ComponentFixture<NcrViewEasaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrViewEasaFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NcrViewEasaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
