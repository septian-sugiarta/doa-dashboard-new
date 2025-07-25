import { Component } from '@angular/core';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { NcrFormService } from '../../services/ncr-form/ncr-form.service';
import { Router } from '@angular/router';
import { ActionLogService } from '../../services/action-log/action-log.service';

@Component({
  selector: 'app-action-log',
  imports: [TextInputComponent, OptionInputComponent, TextAreaInputComponent, ButtonComponent],
  providers: [FormsModule],
  templateUrl: './action-log.component.html',
  styleUrl: './action-log.component.css'
})
export class ActionLogComponent {
  constructor(private actionLogService: ActionLogService, private router: Router,) { }


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

  onSubmit() {
    this.actionLogService.createActionLog(this.formData).subscribe(
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
