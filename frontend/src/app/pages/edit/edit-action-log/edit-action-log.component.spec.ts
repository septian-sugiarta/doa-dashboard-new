import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionLogComponent } from './edit-action-log.component';

describe('EditActionLogComponent', () => {
  let component: EditActionLogComponent;
  let fixture: ComponentFixture<EditActionLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditActionLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditActionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
