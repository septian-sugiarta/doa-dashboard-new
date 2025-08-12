import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { SortButtonComponent } from '../../shared/sort-button/sort-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { NcrFormService } from '../../services/ncr-form/ncr-form.service';

import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../../shared/modal/modal.component';
import { forkJoin } from 'rxjs';
import { NcrReplyService } from '../../services/ncr-reply/ncr-reply.service';
import { NcrFollowResultService } from '../../services/ncr-follow-result/ncr-follow-result.service';

@Component({
  selector: 'app-ncr-list',
  standalone: true,
  imports: [SortButtonComponent, ButtonComponent, SearchBarComponent, CommonModule, RouterModule, ModalComponent],
  providers: [DatePipe],
  templateUrl: './ncr-list.component.html',
  styleUrls: ['./ncr-list.component.css']
})
export class NcrListComponent implements OnInit {
  data: {
    NCR_init_ID: number,

    status: string,
    ncrformStatus: string,
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
    RCA_problem?: string,
    Corrective_Action?: string,
    Preventive_Action?: string,
    Recommend_corrective_action?: string,
    Identified_by_Auditee?: string,
    Identified_Date?: Date,
    Accept_by_Auditor?: string,
    Auditor_Accept_date?: Date,
    implementationReply_date?: Date,
    Close_Corrective_Actions?: string,
    Proposed_Close_Auditee?: string,
    Proposed_Close_Date?: Date,
    Implemented_close_date?: Date,
    Is_close?: string,
    effectiveness?: string,
    Refer_to_Verify_Sheet?: string,
    Sheet_No?: string,
    New_NCR_Issue_nbr?: string,
    Close_approved_by?: string,
    Close_approved_date?: Date,
    Verified_Chief_IM?: string,
    Verified_Date?: Date,
    followup_audit_result?: string,
    evidence?: string,

    ncrreplyStatus?: string,
    ncrfollowresultStatus?: string
  }[] = [];
  search: string = '';
  formattedAnswerDueDate: { day: string; month: string; year: string }[] = [];

  sortState = {
    RegulationBased: 0,
    NCR_nbr: 0,
    Encountered_Condition: 0,
    To_UIC: 0,
    Answer_due_date: 0,
    Level_of_Finding: 0,
    status: 0
  };
  ncrList: any[] = [];

  constructor(
    private readonly ncrFormService: NcrFormService,
    private readonly ncrReplyService: NcrReplyService,
    private readonly ncrFollowResultService: NcrFollowResultService,
    private router: Router,
    private datePipe: DatePipe
  ) { }
  visibility: string = '';
  ngOnInit(): void {
    this.loadNcrForms();
    this.getNcrForms();

    const token = localStorage.getItem('auth_token');
    if (token) {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = atob(base64);
      const decodedObject = JSON.parse(decodedPayload);
      const role = decodedObject.role;

      this.visibility = (role === 'admin' || role === 'IM') ? 'block' : 'hidden';
    }
  }

  exportToExcel(): void {
    this.ncrFormService.getNcrForms(this.search).subscribe(ncrForms => {
      console.log('Received NcrForm Data:', ncrForms);

      forkJoin([
        this.ncrReplyService.getNcrReplies(),
        this.ncrFollowResultService.getNcrFollowResults()
      ]).subscribe(([ncrReplies, ncrFollowResults]) => {
        console.log('Received NcrReply Data:', ncrReplies);
        console.log('Received NcrFollowResult Data:', ncrFollowResults);

        const formattedData = ncrForms.map(item => {
          const ncrReply = ncrReplies.find(reply => reply.ncrId === item.NCR_init_ID);
          const ncrFollowResult = ncrFollowResults.find(followResult => followResult.ncrId === item.NCR_init_ID);

          return {
            'NCR Number': item.NCR_nbr,
            'Regulation Based': item.RegulationBased,
            'Subject': item.Subject,
            'Audit Plan No': item.Audit_Plan_No,
            'Issued Date': this.datePipe.transform(item.Issued_date, 'dd-MMMM-yyyy'),
            'Responsible Office': item.Responsible_Office,
            'Times Occurred': item.times_occurred,
            'Audit Type': item.Audit_Type,
            'Audit Scope': item.Audit_scope,
            'To UIC': item.To_UIC,
            'Attention': item.Attention,
            'Required Condition Ref': item.Required_condition_reff,
            'Level of Finding': item.Level_of_Finding,
            'Implementation Date': this.datePipe.transform(item.implementation_date, 'dd-MMMM-yyyy'),
            'Problem Analysis': item.Problem_Analysis,
            'Answer Due Date': this.datePipe.transform(item.Answer_due_date, 'dd-MMMM-yyyy'),
            'Issue IAN': item.Issue_IAN,
            'IAN Number': item.IAN_nbr,
            'Encountered Condition': item.Encountered_Condition,
            'Audited By': item.Audited_by,
            'Audit Date': this.datePipe.transform(item.Audit_Date, 'dd-MMMM-yyyy'),
            'Acknowledge By': item.Acknowledge_by,
            'Acknowledge Date': this.datePipe.transform(item.Acknowledge_date, 'dd-MMMM-yyyy'),
            'Status': item.status,
            'Remark': item.Remark,
            'RCA Problem': ncrReply ? ncrReply.RCA_problem : item.RCA_problem,
            'Corrective Action': ncrReply ? ncrReply.Corrective_Action : item.Corrective_Action,
            'Preventive Action': ncrReply ? ncrReply.Preventive_Action : item.Preventive_Action,
            'Recommended Corrective Action': ncrReply ? ncrReply.Recommend_corrective_action : item.Recommend_corrective_action,
            'Identified By Auditee': ncrReply ? ncrReply.Identified_by_Auditee : item.Identified_by_Auditee,
            'Identified Date': this.datePipe.transform(ncrReply ? ncrReply.Identified_Date : item.Identified_Date, 'dd-MMMM-yyyy'),
            'Accept By Auditor': ncrReply ? ncrReply.Accept_by_Auditor : item.Accept_by_Auditor,
            'Auditor Accept Date': this.datePipe.transform(ncrReply ? ncrReply.Auditor_Accept_date : item.Auditor_Accept_date, 'dd-MMMM-yyyy'),
            'Implementation Reply Date': this.datePipe.transform(ncrReply ? ncrReply.implementationReply_date : item.implementationReply_date, 'dd-MMMM-yyyy'),
            'Close Corrective Actions': ncrFollowResult ? ncrFollowResult.Close_Corrective_Actions : item.Close_Corrective_Actions,
            'Proposed Close Auditee': ncrFollowResult ? ncrFollowResult.Proposed_Close_Auditee : item.Proposed_Close_Auditee,
            'Proposed Close Date': this.datePipe.transform(ncrFollowResult ? ncrFollowResult.Proposed_Close_Date : item.Proposed_Close_Date, 'dd-MMMM-yyyy'),
            'Implemented Close Date': this.datePipe.transform(ncrFollowResult ? ncrFollowResult.Implemented_close_date : item.Implemented_close_date, 'dd-MMMM-yyyy'),
            'Is Closed': ncrFollowResult ? ncrFollowResult.Is_close : item.Is_close,
            'Effectiveness': ncrFollowResult ? ncrFollowResult.effectiveness : item.effectiveness,
            'Refer to Verify Sheet': ncrFollowResult ? ncrFollowResult.Refer_to_Verify_Sheet : item.Refer_to_Verify_Sheet,
            'Sheet No': ncrFollowResult ? ncrFollowResult.Sheet_No : item.Sheet_No,
            'New NCR Issue Number': ncrFollowResult ? ncrFollowResult.New_NCR_Issue_nbr : item.New_NCR_Issue_nbr,
            'Close Approved By': ncrFollowResult ? ncrFollowResult.Close_approved_by : item.Close_approved_by,
            'Close Approved Date': this.datePipe.transform(ncrFollowResult ? ncrFollowResult.Close_approved_date : item.Close_approved_date, 'dd-MMMM-yyyy'),
            'Verified Chief IM': ncrFollowResult ? ncrFollowResult.Verified_Chief_IM : item.Verified_Chief_IM,
            'Verified Date': this.datePipe.transform(ncrFollowResult ? ncrFollowResult.Verified_Date : item.Verified_Date, 'dd-MMMM-yyyy'),
            'Followup Audit Result': ncrFollowResult ? ncrFollowResult.followup_audit_result : item.followup_audit_result,
            'Evidence': ncrFollowResult ? ncrFollowResult.evidence : item.evidence,
            'NCR Reply Status': ncrReply ? ncrReply.ncrreplyStatus : 'No Reply',
            'NCR Follow Result Status': ncrFollowResult ? ncrFollowResult.ncrfollowresultStatus : 'No Follow Result'
          };
        });

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);

        const wb: XLSX.WorkBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, 'NCR Data');

        XLSX.writeFile(wb, 'ncr-data.xlsx');
      });
    });
  }


  @ViewChild('contentContainer') contentContainer!: ElementRef;
  isScrollable = false;

  ngAfterViewChecked() {
    this.isScrollable = this.contentContainer.nativeElement.scrollHeight > this.contentContainer.nativeElement.clientHeight;
  }

  isModalOpen: boolean = false;
  currentNcrId: number | null = null;

  openModal(id: number) {
    this.isModalOpen = true;
    this.currentNcrId = id;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentNcrId = null;
  }

  confirmDelete() {
    if (this.currentNcrId !== null) {
      this.ncrFormService.deleteNcrForm(this.currentNcrId).subscribe(
        (response) => {
          console.log('Deleted successfully:', response);
          this.loadNcrForms();
        },
        (error) => {
          console.error('Error deleting NCR:', error);
        }
      );
    }
    this.closeModal();
  }



  loadNcrForms() {
    forkJoin([
      this.ncrFormService.getNcrForms(this.search),
      this.ncrReplyService.getNcrReplies(),
      this.ncrFollowResultService.getNcrFollowResults()
    ]).subscribe(([ncrForms, ncrReplies, ncrFollowResults]) => {
      console.log('Received NcrForm Data:', ncrForms);
      console.log('Received NcrReply Data:', ncrReplies);
      console.log('Received NcrFollowResult Data:', ncrFollowResults);

      this.data = ncrForms.map(item => {
        const ncrReply = ncrReplies.find(reply => reply.ncrId === item.NCR_init_ID);
        const ncrFollowResult = ncrFollowResults.find(followResult => followResult.ncrId === item.NCR_init_ID);

        return this.getStatusFromModels(item, ncrReply, ncrFollowResult);
      });

      this.formattedAnswerDueDate = this.data.map(item => {
        const formattedDate = this.datePipe.transform(item.Answer_due_date, 'dd-MMM-yyyy') || '';
        const [day, month, year] = formattedDate.split('-');
        return { day, month, year };
      }) as { day: string; month: string; year: string }[];

      console.log(this.data);
    });
  }


  getStatusFromModels(item: any, ncrReply: any, ncrFollowResult: any): any {
    if (item.ncrformStatus === 'Reply' && ncrReply?.ncrreplyStatus === 'Follow Result' && ncrFollowResult?.ncrfollowresultStatus === 'Finish') {
      item.status = 'Finish';
    } else if (item.ncrformStatus === 'Reply' && ncrReply?.ncrreplyStatus === 'Follow Result') {
      item.status = 'Follow Result';
    } else if (item.ncrformStatus === 'Reply') {
      item.status = 'Reply';
    } else {
      item.status = 'Tunggu';
    }

    localStorage.setItem(item.NCR_init_ID.toString(), item.status);

    return item;
  }

  getRouterLink(item: any, ncrReply: any, ncrFollowResult: any): any {

    if (item.ncrformStatus === 'Reply' && ncrReply?.ncrreplyStatus === 'Follow Result' && ncrFollowResult?.ncrfollowresultStatus === 'Finish') {
      item.status = 'Finish';
    } else if (item.ncrformStatus === 'Reply' && ncrReply?.ncrreplyStatus === 'Follow Result') {
      item.status = 'Follow Result';
    } else if (item.ncrformStatus === 'Reply') {
      item.status = 'Reply';
    } else {
      item.status = 'Tunggu';
    }

    localStorage.setItem(item.NCR_init_ID.toString(), item.status);

    return item;
  }

  getNcrLink(regulation: string, NCR_init_ID: number, status: string): string[] {
    const ncrInitIdStr = NCR_init_ID.toString();

    if (status === 'Reply') {
      if (regulation === 'DGCA') {
        return ['/ncr-view-dgca-form', ncrInitIdStr];
      } else if (regulation === 'EASA') {
        return ['/ncr-view-easa-form', ncrInitIdStr];
      }
    } else if (status === 'Follow Result') {
      if (regulation === 'DGCA') {
        return ['/ncr-view-dgca-reply', ncrInitIdStr];
      } else if (regulation === 'EASA') {
        return ['/ncr-view-easa-reply', ncrInitIdStr];
      }
    } else if (status === 'Finish') {
      if (regulation === 'DGCA') {
        return ['/ncr-view-dgca-follow-result', ncrInitIdStr];
      } else if (regulation === 'EASA') {
        return ['/ncr-view-easa-follow-result', ncrInitIdStr];
      }
    }


    return ['/waiting'];
  }

  handleNvsClick(ncr: any) {
  if (ncr.NvsForms && ncr.NvsForms.id) {
    this.router.navigate(['/nvs-preview', ncr.NCR_init_ID]);
  } else {
    this.router.navigate(['/nvs-form', ncr.NCR_init_ID]);
  }
}

  onSearchChange(searchQuery: string) {
    this.search = searchQuery;
    this.loadNcrForms();
  }

  sortData(column: keyof typeof this.sortState) {
    this.sortState[column] = (this.sortState[column] + 1) % 3;
    switch (this.sortState[column]) {
      case 1:
        this.data.sort((a, b) => {
          if (typeof a[column] === 'string' && typeof b[column] === 'string') {
            return (a[column] as string).localeCompare(b[column] as string);
          } else if (typeof a[column] === 'number' && typeof b[column] === 'number') {
            return (a[column] as number) - (b[column] as number);
          }
          return 0;
        });
        break;
      case 2:
        this.data.sort((a, b) => {
          if (typeof a[column] === 'string' && typeof b[column] === 'string') {
            return (b[column] as string).localeCompare(a[column] as string);
          } else if (typeof a[column] === 'number' && typeof b[column] === 'number') {
            return (b[column] as number) - (a[column] as number);
          }
          return 0;
        });
        break;
      default:
        this.loadNcrForms();
        break;
    }
  }
  getNcrForms(): void {
    this.ncrFormService.getNcrForms().subscribe(data => {
      this.ncrList = data;
      console.log('NCR List with NvsForms:', JSON.stringify(this.ncrList, null, 2));
    });
  }
}
