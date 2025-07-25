import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrListComponent } from './ncr-list.component';

describe('NcrListComponent', () => {
  let component: NcrListComponent;
  let fixture: ComponentFixture<NcrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcrListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
