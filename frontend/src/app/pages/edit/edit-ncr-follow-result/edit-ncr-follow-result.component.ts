import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { NcrFollowResultService } from '../../../services/ncr-follow-result/ncr-follow-result.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NcrReplyService } from '../../../services/ncr-reply/ncr-reply.service';
import { NcrFormService } from '../../../services/ncr-form/ncr-form.service';

@Component({
  selector: 'app-edit-ncr-follow-result',
  imports: [TextInputComponent, TextAreaInputComponent, ButtonComponent, OptionInputComponent],
  providers: [FormsModule],
  templateUrl: './edit-ncr-follow-result.component.html',
  styleUrl: './edit-ncr-follow-result.component.css'
})
export class EditNcrFollowResultComponent implements OnInit {
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
    Close_Corrective_Actions: '',
    Proposed_Close_Auditee: '',
    Proposed_Close_Date: '',
    Implemented_close_date: '',
    Is_close: '',
    effectiveness: '',
    Refer_to_Verify_Sheet: '',
    Sheet_No: '',
    New_NCR_Issue_nbr: '',
    Close_approved_by: '',
    Close_approved_date: '',
    Verified_Chief_IM: '',
    Verified_Date: '',
    followup_audit_result: '',
    evidence: '',
    ncrId: 0,
    ncrReplyId: 0
  };

  constructor(
    private ncrFollowResultService: NcrFollowResultService,
    private route: ActivatedRoute,
    private router: Router,
    private ncrReplyService: NcrReplyService,
    private ncrFormService: NcrFormService
  ) { }

  ngOnInit() {
    const ncrInitId = this.route.snapshot.paramMap.get('NCR_init_ID');
    console.log('NCR Init ID:', ncrInitId);

    if (ncrInitId) {
      this.formData.ncrId = Number(ncrInitId);
      this.loadFormData(this.formData.ncrId);
      this.loadReplyData(this.formData.ncrId);
      this.loadFollowResultData(this.formData.ncrId);
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

  loadReplyData(NCR_init_ID: number): void {
    this.ncrReplyService.getNcrReply(NCR_init_ID).subscribe(
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


  loadFollowResultData(NCR_init_ID: number): void {
    this.ncrFollowResultService.getNcrFollowResult(NCR_init_ID).subscribe(
      (data) => {
        if (data) {
          this.formData = { ...this.formData, ...data };
        } else {
          console.log('No NCR Follow Result data found for the given ID');
        }
      },
      (error) => {
        console.error('Error fetching NCR Follow Result data:', error);
      }
    );
  }


  onSubmit() {
    this.ncrFollowResultService.updateNcrFollowResult(this.formData).subscribe(
      (response: any) => {
        console.log('Follow result updated successfully');

        this.router.navigate(['/ncr-list']);
      },
      (error) => {
        console.error('Error updating follow result', error);
      }
    );
  }
}
