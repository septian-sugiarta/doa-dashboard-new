import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvsFormComponent } from './nvs-form.component';

describe('NvsFormComponent', () => {
  let component: NvsFormComponent;
  let fixture: ComponentFixture<NvsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NvsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NvsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
