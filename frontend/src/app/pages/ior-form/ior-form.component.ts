import { Component } from '@angular/core';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { CheckboxComponent } from '../../shared/checkbox/checkbox.component';
import { IorFormService } from '../../services/ior-form/ior-form.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ior-form',
  standalone: true,
  imports: [TextInputComponent, OptionInputComponent, TextAreaInputComponent, ButtonComponent, CheckboxComponent, FormsModule],
  templateUrl: './ior-form.component.html',
  styleUrl: './ior-form.component.css'
})
export class IorFormComponent {
  constructor(private iorFormService: IorFormService, private router: Router) { }

  formData = {
    subject_ior: '',
    occur_nbr: '',
    occur_date: '',
    reference_ior: '',
    to_uic: '',
    cc_uic: '',
    category_occur: '',
    type_or_pnbr: '',
    level_type: [],
    detail_occurance: '',
    Reportedby: '',
    reporter_uic: '',
    report_date: '',
    reporter_identity: [],
    data_reference: [],
    hirac_process: [],
    Initial_probability: '',
    initial_severity: '',
    initial_riskindex: ''
  }

  onSubmit() {
  const payload = {
    ...this.formData,
    occur_nbr: `IOR/E-${this.formData.occur_nbr}`
  };

  this.iorFormService.createIorForm(payload).subscribe(
    (response: any) => {
      console.log('Form submitted successfully');

      this.updateStatusAfterSubmit(response.id_IOR);
      this.router.navigate(['/ior-list']);
    },
    (error) => {
      console.error('Error submitting form', error);
    }
  );
}

  updateStatusAfterSubmit(iorId: number) {

    this.iorFormService.updateIorFormStatus(iorId, 'Follow On').subscribe(
      (response) => {
        console.log('Status updated successfully');
      },
      (error) => {
        console.error('Error updating status', error);
      }
    );
  }


}
