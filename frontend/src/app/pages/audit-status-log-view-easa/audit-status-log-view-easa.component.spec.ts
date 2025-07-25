import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditStatusLogViewEasaComponent } from './audit-status-log-view-easa.component';

describe('AuditStatusLogViewEasaComponent', () => {
  let component: AuditStatusLogViewEasaComponent;
  let fixture: ComponentFixture<AuditStatusLogViewEasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditStatusLogViewEasaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditStatusLogViewEasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
