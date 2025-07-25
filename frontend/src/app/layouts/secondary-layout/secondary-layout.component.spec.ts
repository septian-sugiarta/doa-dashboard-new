import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryLayoutComponent } from './secondary-layout.component';

describe('SecondaryLayoutComponent', () => {
  let component: SecondaryLayoutComponent;
  let fixture: ComponentFixture<SecondaryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
