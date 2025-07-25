import { afterNextRender, Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ButtonComponent } from '../../shared/button/button.component';
import { NcrFormService } from '../../services/ncr-form/ncr-form.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { NcrReplyService } from '../../services/ncr-reply/ncr-reply.service';
import { NcrFollowResultService } from '../../services/ncr-follow-result/ncr-follow-result.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ncr-view-dgca',
  imports: [ButtonComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './ncr-view-dgca.component.html',
  styleUrl: './ncr-view-dgca.component.css'
})
export class NcrViewDgcaComponent implements OnInit {
  data: {
    RegulationBased: string,
    Subject: string,
    Audit_Plan_No: string,
    NCR_nbr: string,
    Issued_date: Date,
    Responsible_Office: string,
    times_occurred: string,
    Audit_Type: string,
    Audit_scope: string,
    To_UIC: string,
    Attention: string,
    Required_condition_reff: string,
    Level_of_Finding: string,
    implementation_date: Date,
    Problem_Analysis: string,
    Answer_due_date: Date,
    Issue_IAN: string,
    IAN_nbr: string,
    Encountered_Condition: string,
    Audited_by: string,
    Audit_Date: Date,
    Acknowledge_by: string,
    Acknowledge_date: Date,
    Status: string,
    Remark: string,
    RCA_problem: string,
    Corrective_Action: string,
    Preventive_Action: string,
    Recommend_corrective_action: string,
    Identified_by_Auditee: string,
    Identified_Date: Date,
    Accept_by_Auditor: string,
    Auditor_Accept_date: Date,
    implementationReply_date: Date,
    Close_Corrective_Actions: string,
    Proposed_Close_Auditee: string,
    Proposed_Close_Date: Date,
    Implemented_close_date: Date,
    Is_close: string,
    effectiveness: string,
    Refer_to_Verify_Sheet: string,
    Sheet_No: string,
    New_NCR_Issue_nbr: string,
    Close_approved_by: string,
    Close_approved_date: Date,
    Verified_Chief_IM: string,
    Verified_Date: Date,
    followup_audit_result: string,
    ncrformStatus: string,
    ncrreplyStatus: string,
    ncrfollowresultStatus: string,
    ncrId: number,
    ncrReply?: any, // Added ncrReply property
    ncrFollowResult?: any // Added ncrFollowResult property
  } | null = null;

  constructor(private readonly ncrFormService: NcrFormService,
    private readonly ncrReplyService: NcrReplyService,
    private readonly ncrFollowResultService: NcrFollowResultService, private datePipe: DatePipe, private route: ActivatedRoute) {

  }



  ngOnInit(): void {
    const ncrInitId = this.route.snapshot.paramMap.get('NCR_init_ID');

    if (ncrInitId) {
      const ncrId = Number(ncrInitId);

      this.loadFormData(ncrId);


      if (this.data?.ncrformStatus === 'Reply') {

        console.log('Status: Reply, hanya loadFormData yang dipanggil');
      } else if (this.data?.ncrreplyStatus === 'Follow Result') {
        this.loadReplyData(ncrId);
        console.log('Status: Follow Result, loadFormData dan loadReplyData dipanggil');
      } else if (this.data?.ncrfollowresultStatus === 'Finish') {
        this.loadReplyData(ncrId);
        this.loadFollowResultData(ncrId);
        console.log('Status: Finish, loadFormData, loadReplyData, dan loadFollowResultData dipanggil');
      }
    }
  }


  loadFormData(NCR_init_ID: number): void {
    this.ncrFormService.getNcrForm(NCR_init_ID).subscribe(
      (data) => {
        if (data) {
          this.data = { ...this.data, ...data };
          console.log('NcrForm Data:', data);

          if (this.data?.ncrformStatus === 'Reply') {
            console.log('Status: Reply, hanya loadFormData yang dipanggil');
          }
        }
      },
      (error) => {
        console.error('Error fetching NcrForm data:', error);
      }
    );
  }


  loadReplyData(NCR_init_ID: number): void {
    this.ncrReplyService.getNcrReply(NCR_init_ID).subscribe(
      (data) => {
        if (data) {
          this.data = {
            RegulationBased: this.data?.RegulationBased || '',
            Subject: this.data?.Subject || '',
            Audit_Plan_No: this.data?.Audit_Plan_No || '',
            NCR_nbr: this.data?.NCR_nbr || '',
            Issued_date: this.data?.Issued_date || new Date(),
            Responsible_Office: this.data?.Responsible_Office || '',
            times_occurred: this.data?.times_occurred || '',
            Audit_Type: this.data?.Audit_Type || '',
            Audit_scope: this.data?.Audit_scope || '',
            To_UIC: this.data?.To_UIC || '',
            Attention: this.data?.Attention || '',
            Required_condition_reff: this.data?.Required_condition_reff || '',
            Level_of_Finding: this.data?.Level_of_Finding || '',
            implementation_date: this.data?.implementation_date || new Date(),
            Problem_Analysis: this.data?.Problem_Analysis || '',
            Answer_due_date: this.data?.Answer_due_date || new Date(),
            Issue_IAN: this.data?.Issue_IAN || '',
            IAN_nbr: this.data?.IAN_nbr || '',
            Encountered_Condition: this.data?.Encountered_Condition || '',
            Audited_by: this.data?.Audited_by || '',
            Audit_Date: this.data?.Audit_Date || new Date(),
            Acknowledge_by: this.data?.Acknowledge_by || '',
            Acknowledge_date: this.data?.Acknowledge_date || new Date(),
            Status: this.data?.Status || '',
            Remark: this.data?.Remark || '',
            RCA_problem: this.data?.RCA_problem || '',
            Corrective_Action: this.data?.Corrective_Action || '',
            Preventive_Action: this.data?.Preventive_Action || '',
            Recommend_corrective_action: this.data?.Recommend_corrective_action || '',
            Identified_by_Auditee: this.data?.Identified_by_Auditee || '',
            Identified_Date: this.data?.Identified_Date || new Date(),
            Accept_by_Auditor: this.data?.Accept_by_Auditor || '',
            Auditor_Accept_date: this.data?.Auditor_Accept_date || new Date(),
            implementationReply_date: this.data?.implementationReply_date || new Date(),
            Close_Corrective_Actions: this.data?.Close_Corrective_Actions || '',
            Proposed_Close_Auditee: this.data?.Proposed_Close_Auditee || '',
            Proposed_Close_Date: this.data?.Proposed_Close_Date || new Date(),
            Implemented_close_date: this.data?.Implemented_close_date || new Date(),
            Is_close: this.data?.Is_close || '',
            effectiveness: this.data?.effectiveness || '',
            Refer_to_Verify_Sheet: this.data?.Refer_to_Verify_Sheet || '',
            Sheet_No: this.data?.Sheet_No || '',
            New_NCR_Issue_nbr: this.data?.New_NCR_Issue_nbr || '',
            Close_approved_by: this.data?.Close_approved_by || '',
            Close_approved_date: this.data?.Close_approved_date || new Date(),
            Verified_Chief_IM: this.data?.Verified_Chief_IM || '',
            Verified_Date: this.data?.Verified_Date || new Date(),
            followup_audit_result: this.data?.followup_audit_result || '',
            ncrformStatus: this.data?.ncrformStatus || '',
            ncrreplyStatus: this.data?.ncrreplyStatus || '',
            ncrfollowresultStatus: this.data?.ncrfollowresultStatus || '',
            ncrId: this.data?.ncrId || 0,
            ncrReply: {
              RCA_problem: data.RCA_problem,
              Corrective_Action: data.Corrective_Action,
              Preventive_Action: data.Preventive_Action,
              Recommend_corrective_action: data.Recommend_corrective_action,
              Identified_by_Auditee: data.Identified_by_Auditee,
              Identified_Date: data.Identified_Date,
              Accept_by_Auditor: data.Accept_by_Auditor,
              Auditor_Accept_date: data.Auditor_Accept_date,
              ncrreplyStatus: data.ncrreplyStatus,
              ncrId: data.ncrId,
            }
          };
          console.log('NcrReply Data:', data);
          if (this.data?.ncrreplyStatus === 'Follow Result') {
            console.log('Status: Follow Result, loadFormData dan loadReplyData dipanggil');
          }
        }
      },
      (error) => {
        console.error('Error fetching NcrReply data:', error);
      }
    );
  }

  loadFollowResultData(NCR_init_ID: number): void {
    this.ncrFollowResultService.getNcrFollowResult(NCR_init_ID).subscribe(
      (data) => {
        if (data) {
          this.data = {
            RegulationBased: this.data?.RegulationBased || '',
            Subject: this.data?.Subject || '',
            Audit_Plan_No: this.data?.Audit_Plan_No || '',
            NCR_nbr: this.data?.NCR_nbr || '',
            Issued_date: this.data?.Issued_date || new Date(),
            Responsible_Office: this.data?.Responsible_Office || '',
            times_occurred: this.data?.times_occurred || '',
            Audit_Type: this.data?.Audit_Type || '',
            Audit_scope: this.data?.Audit_scope || '',
            To_UIC: this.data?.To_UIC || '',
            Attention: this.data?.Attention || '',
            Required_condition_reff: this.data?.Required_condition_reff || '',
            Level_of_Finding: this.data?.Level_of_Finding || '',
            implementation_date: this.data?.implementation_date || new Date(),
            Problem_Analysis: this.data?.Problem_Analysis || '',
            Answer_due_date: this.data?.Answer_due_date || new Date(),
            Issue_IAN: this.data?.Issue_IAN || '',
            IAN_nbr: this.data?.IAN_nbr || '',
            Encountered_Condition: this.data?.Encountered_Condition || '',
            Audited_by: this.data?.Audited_by || '',
            Audit_Date: this.data?.Audit_Date || new Date(),
            Acknowledge_by: this.data?.Acknowledge_by || '',
            Acknowledge_date: this.data?.Acknowledge_date || new Date(),
            Status: this.data?.Status || '',
            Remark: this.data?.Remark || '',
            RCA_problem: this.data?.RCA_problem || '',
            Corrective_Action: this.data?.Corrective_Action || '',
            Preventive_Action: this.data?.Preventive_Action || '',
            Recommend_corrective_action: this.data?.Recommend_corrective_action || '',
            Identified_by_Auditee: this.data?.Identified_by_Auditee || '',
            Identified_Date: this.data?.Identified_Date || new Date(),
            Accept_by_Auditor: this.data?.Accept_by_Auditor || '',
            Auditor_Accept_date: this.data?.Auditor_Accept_date || new Date(),
            implementationReply_date: this.data?.implementationReply_date || new Date(),
            Close_Corrective_Actions: this.data?.Close_Corrective_Actions || '',
            Proposed_Close_Auditee: this.data?.Proposed_Close_Auditee || '',
            Proposed_Close_Date: this.data?.Proposed_Close_Date || new Date(),
            Implemented_close_date: this.data?.Implemented_close_date || new Date(),
            Is_close: this.data?.Is_close || '',
            effectiveness: this.data?.effectiveness || '',
            Refer_to_Verify_Sheet: this.data?.Refer_to_Verify_Sheet || '',
            Sheet_No: this.data?.Sheet_No || '',
            New_NCR_Issue_nbr: this.data?.New_NCR_Issue_nbr || '',
            Close_approved_by: this.data?.Close_approved_by || '',
            Close_approved_date: this.data?.Close_approved_date || new Date(),
            Verified_Chief_IM: this.data?.Verified_Chief_IM || '',
            Verified_Date: this.data?.Verified_Date || new Date(),
            followup_audit_result: this.data?.followup_audit_result || '',
            ncrformStatus: this.data?.ncrformStatus || '',
            ncrreplyStatus: this.data?.ncrreplyStatus || '',
            ncrfollowresultStatus: this.data?.ncrfollowresultStatus || '',
            ncrId: this.data?.ncrId || 0,
            ncrReply: this.data?.ncrReply || null,
            ncrFollowResult: {
              Close_Corrective_Actions: data.Close_Corrective_Actions,
              Proposed_Close_Auditee: data.Proposed_Close_Auditee,
              Proposed_Close_Date: data.Proposed_Close_Date,
              Implemented_close_date: data.Implemented_close_date,
              Is_close: data,
              effectiveness: data.effectiveness,
              Refer_to_Verify_Sheet: data.Refer_to_Verify_Sheet,
              Sheet_No: data.Sheet_No,
              New_NCR_Issue_nbr: data.New_NCR_Issue_nbr,
              Close_approved_by: data.Close_approved_by,
              Close_approved_date: data.Close_approved_date,
              Verified_Chief_IM: data.Verified_Chief_IM,
              Verified_Date: data.Verified_Date,
              ncrfollowresultStatus: data.ncrfollowresultStatus,
              ncrId: data.ncrId,
            }
          };
          console.log('NcrFollowResult Data:', data);
          if (this.data?.ncrfollowresultStatus === 'Finish') {
            console.log('Status: Finish, loadFormData, loadReplyData, dan loadFollowResultData dipanggil');
          }
        }
      },
      (error) => {
        console.error('Error fetching NcrFollowResult data:', error);
      }
    );
  }

  getFormattedIssuedDate() {
    return this.datePipe.transform(this.data?.Issued_date, 'dd MMMM yyyy');
  }
  getFormattedAuditDate() {
    return this.datePipe.transform(this.data?.Audit_Date, 'dd MMMM yyyy');
  }

  getFormattedAcknowledgeDate() {
    return this.datePipe.transform(this.data?.Acknowledge_date, 'dd MMMM yyyy');
  }

  public convertToPDF() {
    var data = document.getElementById('contentToConvert');
    if (data) {
      html2canvas(data, { scale: 2 }).then(canvas => {
        var imgWidth = 210;
        var pageHeight = 297;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jspdf('p', 'mm', 'a4', true);
        let position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);


        pdf.save('new-file.pdf');
      });
    }
  }


}

