import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPlanComponent } from './audit-plan.component';

describe('AuditPlanComponent', () => {
  let component: AuditPlanComponent;
  let fixture: ComponentFixture<AuditPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
