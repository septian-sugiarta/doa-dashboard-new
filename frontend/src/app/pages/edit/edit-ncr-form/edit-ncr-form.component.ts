import { Component, OnInit } from '@angular/core';
import { NcrFormService } from '../../../services/ncr-form/ncr-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TextInputComponent } from '../../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-ncr-form',
  imports: [TextInputComponent, OptionInputComponent, TextAreaInputComponent, ButtonComponent],
  providers: [FormsModule],
  templateUrl: './edit-ncr-form.component.html',
  styleUrl: './edit-ncr-form.component.css'
})
export class EditNcrFormComponent implements OnInit {
  constructor(private ncrFormService: NcrFormService, private router: Router, private route: ActivatedRoute) { }


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


  ngOnInit(): void {
    const ncrInitId = this.route.snapshot.paramMap.get('NCR_init_ID');
    console.log('NCR Init ID:', ncrInitId);

    if (ncrInitId) {
      this.loadFormData(Number(ncrInitId));
    }
  }


  loadFormData(NCR_init_ID: number): void {
    this.ncrFormService.getNcrForm(NCR_init_ID).subscribe(
      (data) => {
        if (data.Issued_date) {
          this.formData.Issued_date = this.formatDate(data.Issued_date);
        }
        if (data.Answer_due_date) {
          this.formData.Answer_due_date = this.formatDate(data.Answer_due_date);
        }
        if (data.Audit_Date) {
          this.formData.Audit_Date = this.formatDate(data.Audit_Date);
        }
        if (data.Acknowledge_date) {
          this.formData.Acknowledge_date = this.formatDate(data.Acknowledge_date);
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
    this.ncrFormService.updateNcrForm(this.formData).subscribe(
      (response) => {
        console.log('Form updated successfully');
        this.router.navigate(['/ncr-list']);
      },
      (error) => {
        console.error('Error updating form', error);
      }
    );
  }
}
