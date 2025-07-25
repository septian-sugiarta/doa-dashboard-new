import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditStatusLogListComponent } from './audit-status-log-list.component';

describe('AuditStatusLogListComponent', () => {
  let component: AuditStatusLogListComponent;
  let fixture: ComponentFixture<AuditStatusLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditStatusLogListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditStatusLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
