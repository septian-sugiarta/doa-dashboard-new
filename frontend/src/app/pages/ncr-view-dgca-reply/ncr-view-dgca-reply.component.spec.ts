import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrViewDgcaReplyComponent } from './ncr-view-dgca-reply.component';

describe('NcrViewDgcaReplyComponent', () => {
  let component: NcrViewDgcaReplyComponent;
  let fixture: ComponentFixture<NcrViewDgcaReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrViewDgcaReplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcrViewDgcaReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
