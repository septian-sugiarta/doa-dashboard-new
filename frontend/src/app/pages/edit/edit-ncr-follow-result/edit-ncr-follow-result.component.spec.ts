import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNcrFollowResultComponent } from './edit-ncr-follow-result.component';

describe('EditNcrFollowResultComponent', () => {
  let component: EditNcrFollowResultComponent;
  let fixture: ComponentFixture<EditNcrFollowResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNcrFollowResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNcrFollowResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
