import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrViewDgcaFollowResultComponent } from './ncr-view-dgca-follow-result.component';

describe('NcrViewDgcaFollowResultComponent', () => {
  let component: NcrViewDgcaFollowResultComponent;
  let fixture: ComponentFixture<NcrViewDgcaFollowResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrViewDgcaFollowResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcrViewDgcaFollowResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
