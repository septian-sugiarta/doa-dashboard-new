import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IorFollowOnComponent } from './ior-follow-on.component';

describe('IorFollowOnComponent', () => {
  let component: IorFollowOnComponent;
  let fixture: ComponentFixture<IorFollowOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IorFollowOnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IorFollowOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
