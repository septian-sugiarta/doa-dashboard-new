import { Component } from '@angular/core';
import { TextInputComponent } from '../../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { ActionLogService } from '../../../services/action-log/action-log.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-action-log',
  imports: [TextInputComponent, OptionInputComponent, TextAreaInputComponent, ButtonComponent],
  providers: [FormsModule],
  templateUrl: './edit-action-log.component.html',
  styleUrl: './edit-action-log.component.css'
})
export class EditActionLogComponent {
  constructor(private actionLogService: ActionLogService, private router: Router, private route: ActivatedRoute) { }


  formData = {
    regulation_based: '',
    action_nbr: '',
    reference_PACLR_nbr: '',
    issued_date: '',
    action_description: '',
    audit_area: '',
    status: '',
    implementationAction_date: '',
    evidence: '',
    close_date: '',
  }

  ngOnInit(): void {
    const ncrInitId = this.route.snapshot.paramMap.get('actionLog_id');
    console.log('actionLog_id:', ncrInitId);

    if (ncrInitId) {
      this.loadFormData(Number(ncrInitId));
    }
  }

  loadFormData(actionLog_id: number): void {
    this.actionLogService.getActionLog(actionLog_id).subscribe(
      (data) => {
        if (data.issued_date) {
          this.formData.issued_date = this.formatDate(data.issued_date);
        }
        if (data.implementationAction_date) {
          this.formData.implementationAction_date = this.formatDate(data.implementationAction_date);
        }
        if (data.close_date) {
          this.formData.close_date = this.formatDate(data.close_date);
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

    this.actionLogService.updateActionLog(this.formData).subscribe(
      (response: any) => {
        console.log('Form submitted successfully');
        this.router.navigate(['/action-log-list']);
      },
      (error) => {
        console.error('Error submitting form', error);
      }
    );
  }

}
