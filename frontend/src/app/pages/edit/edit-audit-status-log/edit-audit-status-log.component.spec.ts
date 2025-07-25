import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuditStatusLogComponent } from './edit-audit-status-log.component';

describe('EditAuditStatusLogComponent', () => {
  let component: EditAuditStatusLogComponent;
  let fixture: ComponentFixture<EditAuditStatusLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAuditStatusLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAuditStatusLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
