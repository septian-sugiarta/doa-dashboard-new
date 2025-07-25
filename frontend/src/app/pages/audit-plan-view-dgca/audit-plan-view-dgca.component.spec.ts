import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPlanViewDgcaComponent } from './audit-plan-view-dgca.component';

describe('AuditPlanViewDgcaComponent', () => {
  let component: AuditPlanViewDgcaComponent;
  let fixture: ComponentFixture<AuditPlanViewDgcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditPlanViewDgcaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditPlanViewDgcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
