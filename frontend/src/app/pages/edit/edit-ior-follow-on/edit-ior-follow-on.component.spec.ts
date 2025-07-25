import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIorFollowOnComponent } from './edit-ior-follow-on.component';

describe('EditIorFollowOnComponent', () => {
  let component: EditIorFollowOnComponent;
  let fixture: ComponentFixture<EditIorFollowOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIorFollowOnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIorFollowOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
