import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPlanViewEasaComponent } from './audit-plan-view-easa.component';

describe('AuditPlanViewEasaComponent', () => {
  let component: AuditPlanViewEasaComponent;
  let fixture: ComponentFixture<AuditPlanViewEasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditPlanViewEasaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditPlanViewEasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
