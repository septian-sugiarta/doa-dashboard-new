import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNcrReplyComponent } from './edit-ncr-reply.component';

describe('EditNcrReplyComponent', () => {
  let component: EditNcrReplyComponent;
  let fixture: ComponentFixture<EditNcrReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNcrReplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNcrReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
