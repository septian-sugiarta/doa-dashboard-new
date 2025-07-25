import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CheckboxComponent } from '../../../shared/checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';
import { IorFollowOnService } from '../../../services/ior-follow-on/ior-follow-on.service';
import { IorFormService } from '../../../services/ior-form/ior-form.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-ior-follow-on',
  imports: [TextInputComponent, TextAreaInputComponent, ButtonComponent, CheckboxComponent],
  providers: [FormsModule],
  templateUrl: './edit-ior-follow-on.component.html',
  styleUrl: './edit-ior-follow-on.component.css'
})
export class EditIorFollowOnComponent implements OnInit {
  constructor(private iorFollowOnService: IorFollowOnService, private iorFormService: IorFormService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
    initial_riskindex: '',
    follup_detail: '',
    follupby: '',
    follup_uic: '',
    follup_date: '',
    follup_datarefer: [],
    follup_status: [],
    nextuic_follup: '',
    current_probability: '',
    current_severity: '',
    current_riskindex: '',
    iorId: 0
  }

  ngOnInit() {
    const iorId = this.route.snapshot.paramMap.get('id_IOR');
    console.log('id_IOR:', iorId);

    if (iorId) {
      this.formData.iorId = Number(iorId);
      this.loadFormData(this.formData.iorId);
      this.loadFollowOnData(this.formData.iorId);
    }
  }

  loadFormData(id_IOR: number): void {
    this.iorFormService.getIorForm(id_IOR).subscribe(
      (data) => {
        this.formData = { ...this.formData, ...data };
      },
      (error) => {
        console.error('Error fetching NCR data:', error);
      }
    );
  }

  loadFollowOnData(id_IOR: number): void {
    this.iorFollowOnService.getIorFollowOn(id_IOR).subscribe(
      (data) => {
        if (data) {
          this.formData = { ...this.formData, ...data };
        } else {
          console.log('No NCR Reply data found for the given ID');
        }
      },
      (error) => {
        console.error('Error fetching NCR Reply data:', error);
      }
    );
  }

  onSubmit() {
    this.iorFollowOnService.updateIorFollowOn(this.formData).subscribe(
      (response: any) => {
        console.log('Form updated successfully');

        this.router.navigate(['/ior-list']);
      },
      (error) => {
        console.error('Error updating form', error);
      }
    );
  }
}
