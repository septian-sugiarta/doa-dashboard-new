import { Component, Input, OnInit } from '@angular/core';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { NcrFormService } from '../../services/ncr-form/ncr-form.service';
import { NcrReplyService } from '../../services/ncr-reply/ncr-reply.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ncr-reply',
  imports: [TextInputComponent, TextAreaInputComponent, ButtonComponent, CommonModule],
  providers: [FormsModule],
  templateUrl: './ncr-reply.component.html',
  styleUrl: './ncr-reply.component.css'
})
export class NcrReplyComponent implements OnInit {
  @Input() disabled: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ncrReplyService: NcrReplyService,
    private ncrFormService: NcrFormService
  ) { }

  ncrNbr!: string;

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
    Remark: '',
    RCA_problem: '',
    Corrective_Action: '',
    Preventive_Action: '',
    Recommend_corrective_action: '',
    Identified_by_Auditee: '',
    Identified_Date: '',
    Accept_by_Auditor: '',
    Auditor_Accept_date: '',
    implementationReply_date: '',


    ncrId: 0
  };


  ngOnInit() {
    const ncrInitId = this.route.snapshot.paramMap.get('NCR_init_ID');
    console.log('NCR Init ID:', ncrInitId);

    if (ncrInitId) {
      this.formData.ncrId = Number(ncrInitId);
      this.loadFormData(this.formData.ncrId);
    }
  }

  loadFormData(NCR_init_ID: number): void {
    this.ncrFormService.getNcrForm(NCR_init_ID).subscribe(
      (data) => {
        this.formData = { ...this.formData, ...data };
      },
      (error) => {
        console.error('Error fetching NCR data:', error);
      }
    );
  }

  onSubmit() {
    this.ncrReplyService.createNcrReply(this.formData).subscribe(
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
    this.ncrReplyService.updateNcrReplyStatus(ncrId, 'Follow Result').subscribe(
      (response) => {
        console.log('Status updated successfully to Follow Result');
      },
      (error) => {
        console.error('Error updating status', error);
      }
    );
  }

}
