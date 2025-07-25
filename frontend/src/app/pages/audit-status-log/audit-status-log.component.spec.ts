import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditStatusLogComponent } from './audit-status-log.component';

describe('AuditStatusLogComponent', () => {
  let component: AuditStatusLogComponent;
  let fixture: ComponentFixture<AuditStatusLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditStatusLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditStatusLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
