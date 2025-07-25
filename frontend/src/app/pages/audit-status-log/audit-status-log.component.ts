import { Component } from '@angular/core';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { AuditStatusLogService } from '../../services/audit-status-log/audit-status-log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit-status-log',
  imports: [TextInputComponent, OptionInputComponent, TextAreaInputComponent, ButtonComponent],
  providers: [FormsModule],
  templateUrl: './audit-status-log.component.html',
  styleUrl: './audit-status-log.component.css'
})
export class AuditStatusLogComponent {
  constructor(private auditStatusLogService: AuditStatusLogService, private router: Router,) { }


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

  onSubmit() {
    this.auditStatusLogService.createAuditStatusLog(this.formData).subscribe(
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
