import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NcrFormService } from '../../services/ncr-form/ncr-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ncr-view-easa-form',
  imports: [ButtonComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './ncr-view-easa-form.component.html',
  styleUrl: './ncr-view-easa-form.component.css'
})
export class NcrViewEasaFormComponent implements OnInit {
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
    ncrId: number,
    ncrReply?: any,
    ncrFollowResult?: any
  } | null = null;

  constructor(private readonly ncrFormService: NcrFormService, private datePipe: DatePipe, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const ncrInitId = this.route.snapshot.paramMap.get('NCR_init_ID');
    if (this.data) {
      this.data.ncrId = Number(ncrInitId);
    }
    if (ncrInitId) {
      this.loadFormData(Number(ncrInitId));
    }
  }


  loadFormData(NCR_init_ID: number): void {
    this.ncrFormService.getNcrForm(NCR_init_ID).subscribe(
      (data) => {

        this.data = { ...this.data, ...data };
      },
      (error) => {
        console.error('Error fetching NCR data:', error);
      }
    );
  }

  getFormattedIssuedDate() {
    return this.datePipe.transform(this.data?.Issued_date, 'dd-MMM-yyyy');
  }
  getFormattedImplementationDate() {
    return this.datePipe.transform(this.data?.implementation_date, 'dd-MMM-yyyy');
  }
  getFormattedAuditDate() {
    return this.datePipe.transform(this.data?.Audit_Date, 'dd-MMM-yyyy');
  }

  getFormattedAcknowledgeDate() {
    return this.datePipe.transform(this.data?.Acknowledge_date, 'dd-MMM-yyyy');
  }
  getFormattedIdentifiedDate() {
    return this.datePipe.transform(this.data?.Identified_Date, 'dd-MMM-yyyy');
  }
  getFormattedAuditorAcceptDate() {
    return this.datePipe.transform(this.data?.Auditor_Accept_date, 'dd-MMM-yyyy');
  }
  getFormattedVerifiedDate() {
    return this.datePipe.transform(this.data?.Verified_Date, 'dd-MMM-yyyy');
  }
  getFormattedAnswerDueDate() {
    return this.datePipe.transform(this.data?.Answer_due_date, 'dd-MMM-yyyy');
  }
  getFormattedImplementationReplyDate() {
    return this.datePipe.transform(this.data?.implementationReply_date, 'dd-MMM-yyyy');
  }
  getFormattedCloseApprovedDate() {
    return this.datePipe.transform(this.data?.Close_approved_date, 'dd-MMM-yyyy');
  }

  public convertToPDF(): void {
    const data = document.getElementById('contentToConvert');
    if (!data) return;

    html2canvas(data, { scale: 2 }).then((canvas) => {
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jspdf('p', 'mm', 'a4');
      let position = 0;
      let heightLeft = imgHeight;
      let currentPage = 1;
      const totalPages = Math.ceil(imgHeight / pageHeight);

      while (heightLeft > 0) {
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);


        pdf.setFontSize(10);
        pdf.text('Form No. GMF/IM/E-002 R3', 25, pageHeight - 10);
        pdf.text(`Page ${currentPage} of ${totalPages}`, imgWidth - 35, pageHeight - 10);

        heightLeft -= pageHeight;
        position -= pageHeight;

        if (heightLeft > 0) {
          pdf.addPage();
          currentPage++;
        }
      }

      const docNbr = this.data?.NCR_nbr || 'UnknownDocNbr';
      const formattedDocNbr = docNbr.replace('/', '-');
      pdf.save(`${formattedDocNbr}.pdf`);

    });
  }


}
