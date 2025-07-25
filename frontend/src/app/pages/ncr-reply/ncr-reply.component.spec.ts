import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrReplyComponent } from './ncr-reply.component';

describe('NcrReplyComponent', () => {
  let component: NcrReplyComponent;
  let fixture: ComponentFixture<NcrReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrReplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcrReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
