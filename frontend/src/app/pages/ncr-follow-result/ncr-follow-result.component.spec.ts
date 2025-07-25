import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrFollowResultComponent } from './ncr-follow-result.component';

describe('NcrFollowResultComponent', () => {
  let component: NcrFollowResultComponent;
  let fixture: ComponentFixture<NcrFollowResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrFollowResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcrFollowResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
