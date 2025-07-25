import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionInputComponent } from './option-input.component';

describe('OptionInputComponent', () => {
  let component: OptionInputComponent;
  let fixture: ComponentFixture<OptionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
