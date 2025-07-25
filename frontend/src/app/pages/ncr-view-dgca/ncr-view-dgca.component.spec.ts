import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrViewDgcaComponent } from './ncr-view-dgca.component';

describe('NcrViewDgcaComponent', () => {
  let component: NcrViewDgcaComponent;
  let fixture: ComponentFixture<NcrViewDgcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrViewDgcaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcrViewDgcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
