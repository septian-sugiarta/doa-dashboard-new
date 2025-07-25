import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrViewEasaReplyComponent } from './ncr-view-easa-reply.component';

describe('NcrViewEasaReplyComponent', () => {
  let component: NcrViewEasaReplyComponent;
  let fixture: ComponentFixture<NcrViewEasaReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrViewEasaReplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcrViewEasaReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
