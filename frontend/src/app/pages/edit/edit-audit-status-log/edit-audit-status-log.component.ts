import { Component } from '@angular/core';
import { TextInputComponent } from '../../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { AuditStatusLogService } from '../../../services/audit-status-log/audit-status-log.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-audit-status-log',
  imports: [TextInputComponent, OptionInputComponent, TextAreaInputComponent, ButtonComponent],
  providers: [FormsModule],
  templateUrl: './edit-audit-status-log.component.html',
  styleUrl: './edit-audit-status-log.component.css'
})
export class EditAuditStatusLogComponent {
  constructor(private auditStatusLogService: AuditStatusLogService, private router: Router, private route: ActivatedRoute) { }


  formData = {
    regulation_based: '',
    doc_nbr: '',
    statusLog_date: '',
    subject: '',
    reason_of_issuance: '',
    prepared_by: '',
    prepared_date: '',
    checked_by: '',
    checked_date: '',
  }

  ngOnInit(): void {
    const ncrInitId = this.route.snapshot.paramMap.get('auditStatusLog_id');
    console.log('auditStatusLog_id:', ncrInitId);

    if (ncrInitId) {
      this.loadFormData(Number(ncrInitId));
    }
  }

  loadFormData(auditStatusLog_id: number): void {
    this.auditStatusLogService.getAuditStatusLog(auditStatusLog_id).subscribe(
      (data) => {
        if (data.statusLog_date) {
          this.formData.statusLog_date = this.formatDate(data.statusLog_date);
        }
        if (data.prepared_date) {
          this.formData.prepared_date = this.formatDate(data.prepared_date);
        }
        if (data.checked_date) {
          this.formData.checked_date = this.formatDate(data.checked_date);
        }

        this.formData = { ...this.formData, ...data };
      },
      (error) => {
        console.error('Error fetching NCR data:', error);
      }
    );
  }

  private formatDate(date: string): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    this.auditStatusLogService.updateAuditStatusLog(this.formData).subscribe(
      (response: any) => {
        console.log('Form submitted successfully');
        this.router.navigate(['/audit-status-log-list']);
      },
      (error) => {
        console.error('Error submitting form', error);
      }
    );
  }
}
