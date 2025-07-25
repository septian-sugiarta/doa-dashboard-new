import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionLogListComponent } from './action-log-list.component';

describe('ActionLogListComponent', () => {
  let component: ActionLogListComponent;
  let fixture: ComponentFixture<ActionLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionLogListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
