import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IorViewFormComponent } from './ior-view-form.component';

describe('IorViewFormComponent', () => {
  let component: IorViewFormComponent;
  let fixture: ComponentFixture<IorViewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IorViewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IorViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
