import { Component } from '@angular/core';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { NcrFormService } from '../../services/ncr-form/ncr-form.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ncr-form',
  imports: [TextInputComponent, OptionInputComponent, TextAreaInputComponent, ButtonComponent],
  providers: [FormsModule],
  templateUrl: './ncr-form.component.html',
  styleUrl: './ncr-form.component.css'
})
export class NcrFormComponent {
  constructor(private ncrFormService: NcrFormService, private router: Router,) { }


  formData = {
    RegulationBased: '',
    Subject: '',
    Audit_Plan_No: '',
    NCR_nbr: '',
    Issued_date: '',
    Responsible_Office: '',
    times_occurred: '',
    Audit_Type: '',
    Audit_scope: '',
    To_UIC: '',
    Attention: '',
    Required_condition_reff: '',
    Level_of_Finding: '',
    implementation_date: '',
    Problem_Analysis: '',
    Answer_due_date: '',
    Issue_IAN: '',
    IAN_nbr: '',
    Encountered_Condition: '',
    Audited_by: '',
    Audit_Date: '',
    Acknowledge_by: '',
    Acknowledge_date: '',
    Status: '',
    Remark: ''
  }


  onSubmit() {
    this.ncrFormService.createNcrForm(this.formData).subscribe(
      (response: any) => {
        console.log('Form submitted successfully');

        this.updateStatusAfterSubmit(response.NCR_init_ID);

        this.router.navigate(['/ncr-list']);
      },
      (error) => {
        console.error('Error submitting form', error);
      }
    );
  }

  updateStatusAfterSubmit(ncrId: number) {
    this.ncrFormService.updateNcrFormStatus(ncrId, 'Reply').subscribe(
      (response) => {
        console.log('Status updated successfully');
      },
      (error) => {
        console.error('Error updating status', error);
      }
    );
  }
}
