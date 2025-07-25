import { Component, OnInit } from '@angular/core';
import { IorFormService } from '../../../services/ior-form/ior-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TextInputComponent } from '../../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CheckboxComponent } from '../../../shared/checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-ior-form',
  imports: [TextInputComponent, OptionInputComponent, TextAreaInputComponent, ButtonComponent, CheckboxComponent],
  providers: [FormsModule],
  templateUrl: './edit-ior-form.component.html',
  styleUrl: './edit-ior-form.component.css'
})
export class EditIorFormComponent implements OnInit {
  constructor(private iorFormService: IorFormService, private router: Router, private route: ActivatedRoute) { }

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


  ngOnInit(): void {
    const iorId = this.route.snapshot.paramMap.get('id_IOR');
    console.log('id_IOR:', iorId);

    if (iorId) {
      this.loadFormData(Number(iorId));
    }
  }


  loadFormData(id_IOR: number): void {
    this.iorFormService.getIorForm(id_IOR).subscribe(
      (data) => {
        if (data.occur_date) {
          this.formData.occur_date = this.formatDate(data.occur_date);
        }
        if (data.report_date) {
          this.formData.report_date = this.formatDate(data.report_date);
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

  onSubmit(): void {
    this.iorFormService.updateIorForm(this.formData).subscribe(
      (response) => {
        console.log('Form updated successfully');
        this.router.navigate(['/ior-list']);
      },
      (error) => {
        console.error('Error updating form', error);
      }
    );
  }
}
