import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrViewEasaComponent } from './ncr-view-easa.component';

describe('NcrViewEasaComponent', () => {
  let component: NcrViewEasaComponent;
  let fixture: ComponentFixture<NcrViewEasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrViewEasaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcrViewEasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
