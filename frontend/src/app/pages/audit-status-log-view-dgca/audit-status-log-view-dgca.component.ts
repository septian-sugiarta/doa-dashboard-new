import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NcrFormService } from '../../services/ncr-form/ncr-form.service';
import { NcrReplyService } from '../../services/ncr-reply/ncr-reply.service';
import { NcrFollowResultService } from '../../services/ncr-follow-result/ncr-follow-result.service';
import { ActivatedRoute } from '@angular/router';
import { AuditStatusLogService } from '../../services/audit-status-log/audit-status-log.service';
import { ActionLogService } from '../../services/action-log/action-log.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-audit-status-log-view-dgca',
  imports: [ButtonComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './audit-status-log-view-dgca.component.html',
  styleUrl: './audit-status-log-view-dgca.component.css'
})
export class AuditStatusLogViewDgcaComponent implements OnInit {

  data: {
    regulation_based: string,
    doc_nbr: string,
    statusLog_date: Date,
    subject: string,
    reason_of_issuance: string,
    prepared_by: string,
    prepared_date: Date,
    checked_by: string,
    checked_date: Date,

    ncrForms?: any[],
    ncrReplies?: any[],
    ncrFollowResults?: any[]
    actionLogs?: any[]
  } | null = null;

  constructor(
    private readonly auditStatusLogService: AuditStatusLogService,
    private readonly ncrFormService: NcrFormService,
    private readonly ncrReplyService: NcrReplyService,
    private readonly ncrFollowResultService: NcrFollowResultService,
    private readonly actionLogService: ActionLogService,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const auditStatusLogId = this.route.snapshot.paramMap.get('auditStatusLog_id');
    if (auditStatusLogId) {
      this.loadFormData(Number(auditStatusLogId));
    }
  }

  loadFormData(auditStatusLog_id: number): void {
    this.auditStatusLogService.getAuditStatusLog(auditStatusLog_id).subscribe(
      (data) => {
        if (data.regulation_based === 'DGCA') {
          this.data = { ...data };

          this.fetchNcrFormsData();
          this.fetchActionLogData();
        } else {
          console.error('Data AuditStatusLog tidak sesuai dengan regulation_based "DGCA"');
        }
      },
      (error) => {
        console.error('Error fetching AuditStatusLog data:', error);
      }
    );
  }

  fetchActionLogData(): void {
    this.actionLogService.getActionLogs().subscribe(
      (actionLogs) => {
        const dgcaActionLogs = actionLogs.filter(actionLog => actionLog.regulation_based === 'DGCA');
        if (this.data) {
          this.data.actionLogs = dgcaActionLogs;
        }
      },
      (error) => {
        console.error('Error fetching ActionLog data:', error);
      }
    );
  }

  fetchNcrFormsData(): void {
    forkJoin([
      this.ncrFormService.getNcrForms(),
      this.ncrReplyService.getNcrReplies(),
      this.ncrFollowResultService.getNcrFollowResults()
    ]).subscribe(([ncrForms, ncrReplies, ncrFollowResults]) => {
      console.log('Received NcrForm Data:', ncrForms);
      console.log('Received NcrReply Data:', ncrReplies);
      console.log('Received NcrFollowResult Data:', ncrFollowResults);

      const dgcaNcrForms = ncrForms.filter(ncrForm => ncrForm.RegulationBased === 'DGCA');
      if (this.data) {
        this.data.ncrForms = dgcaNcrForms;
      }

      if (this.data) {
        this.data.ncrReplies = ncrReplies.filter(reply =>
          dgcaNcrForms.some(ncrForm => ncrForm.NCR_init_ID === reply.ncrId)
        );
      }
      if (this.data) {
        this.data.ncrFollowResults = ncrFollowResults.filter(followResult =>
          dgcaNcrForms.some(ncrForm => ncrForm.NCR_init_ID === followResult.ncrId)
        );
      }

      console.log('Combined NcrForm, NcrReply, and NcrFollowResult:', this.data);
    },
      (error) => {
        console.error('Error fetching NcrForm, NcrReply, and NcrFollowResult data:', error);
      });
  }


  getFormattedStatusLogDate() {
    return this.datePipe.transform(this.data?.statusLog_date, 'dd MMMM yyyy');
  }
  getFormattedIssuedDate() {
    return this.datePipe.transform(this.data?.ncrForms?.[0]?.Issued_date, 'dd MMMM yyyy');
  }
  getFormattedAnswerDueDate() {
    return this.datePipe.transform(this.data?.ncrForms?.[0]?.Answer_due_date, 'dd MMMM yyyy');
  }
  getFormattedImplementationDate() {
    return this.datePipe.transform(this.data?.ncrForms?.[0]?.implementation_date, 'dd MMMM yyyy');
  }
  getFormattedActionIssuedDate() {
    return this.datePipe.transform(this.data?.actionLogs?.[0]?.issued_date, 'dd MMMM yyyy');
  }
  getFormattedImplementationActionDate() {
    return this.datePipe.transform(this.data?.actionLogs?.[0]?.implementationAction_date, 'dd MMMM yyyy');
  }
  getFormattedVerifiedDate() {
    return this.datePipe.transform(this.data?.ncrFollowResults?.[0]?.Verified_Date, 'dd MMMM yyyy');
  }
  getFormattedCloseDate() {
    return this.datePipe.transform(this.data?.actionLogs?.[0]?.close_date, 'dd MMMM yyyy');
  }
  getFormattedPreparedtDate() {
    return this.datePipe.transform(this.data?.prepared_date, 'dd MMMM yyyy');
  }

  getFormattedCheckedDate() {
    return this.datePipe.transform(this.data?.checked_date, 'dd MMMM yyyy');
  }


  public convertToPDF(): void {
    const data = document.getElementById('contentToConvert');
    if (!data) return;

    html2canvas(data, { scale: 2 }).then((canvas) => {
      const imgWidth = 297;
      const pageHeight = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jspdf('l', 'mm', 'a4');
      let position = 0;
      let heightLeft = imgHeight;
      let currentPage = 1;
      const totalPages = Math.ceil(imgHeight / pageHeight);

      while (heightLeft > 0) {
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

        pdf.setFontSize(10);
        pdf.text('Form No.: GMF/IM-003 R2', 10, pageHeight - 10);
        pdf.text(`Page ${currentPage} of ${totalPages}`, imgWidth - 30, pageHeight - 10);

        heightLeft -= pageHeight;
        position -= pageHeight;

        if (heightLeft > 0) {
          pdf.addPage();
          currentPage++;
        }
      }

      const docNbr = this.data?.doc_nbr || 'UnknownDocNbr';
      const formattedDocNbr = docNbr.replace('/', '-');
      pdf.save(`${formattedDocNbr}.pdf`);
    });
  }




}
