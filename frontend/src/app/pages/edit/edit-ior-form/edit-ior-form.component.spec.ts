import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIorFormComponent } from './edit-ior-form.component';

describe('EditIorFormComponent', () => {
  let component: EditIorFormComponent;
  let fixture: ComponentFixture<EditIorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
