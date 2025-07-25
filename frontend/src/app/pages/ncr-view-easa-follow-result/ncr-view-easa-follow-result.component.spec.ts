import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrViewEasaFollowResultComponent } from './ncr-view-easa-follow-result.component';

describe('NcrViewEasaFollowResultComponent', () => {
  let component: NcrViewEasaFollowResultComponent;
  let fixture: ComponentFixture<NcrViewEasaFollowResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrViewEasaFollowResultComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NcrViewEasaFollowResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
