import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNcrFormComponent } from './edit-ncr-form.component';

describe('EditNcrFormComponent', () => {
  let component: EditNcrFormComponent;
  let fixture: ComponentFixture<EditNcrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNcrFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNcrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
