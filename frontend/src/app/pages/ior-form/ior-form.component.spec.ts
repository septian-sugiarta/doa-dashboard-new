import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IorFormComponent } from './ior-form.component';

describe('IorFormComponent', () => {
  let component: IorFormComponent;
  let fixture: ComponentFixture<IorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
