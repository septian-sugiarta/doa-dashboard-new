import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditStatusLogViewDgcaComponent } from './audit-status-log-view-dgca.component';

describe('AuditStatusLogViewDgcaComponent', () => {
  let component: AuditStatusLogViewDgcaComponent;
  let fixture: ComponentFixture<AuditStatusLogViewDgcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditStatusLogViewDgcaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditStatusLogViewDgcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
