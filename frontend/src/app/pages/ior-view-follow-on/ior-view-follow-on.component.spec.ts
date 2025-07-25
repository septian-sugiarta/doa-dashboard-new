import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IorViewFollowOnComponent } from './ior-view-follow-on.component';

describe('IorViewFollowOnComponent', () => {
  let component: IorViewFollowOnComponent;
  let fixture: ComponentFixture<IorViewFollowOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IorViewFollowOnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IorViewFollowOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
