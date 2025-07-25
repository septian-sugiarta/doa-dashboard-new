import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { SortButtonComponent } from '../../shared/sort-button/sort-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule, DatePipe } from '@angular/common';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../../shared/modal/modal.component';
import { NcrFormService } from '../../services/ncr-form/ncr-form.service';
import { NcrReplyService } from '../../services/ncr-reply/ncr-reply.service';
import { NcrFollowResultService } from '../../services/ncr-follow-result/ncr-follow-result.service';
import { forkJoin } from 'rxjs';
import { ActionLogService } from '../../services/action-log/action-log.service';

@Component({
  selector: 'app-action-log-list',
  standalone: true,
  imports: [SortButtonComponent, ButtonComponent, SearchBarComponent, CommonModule, RouterModule, ModalComponent],
  providers: [DatePipe],
  templateUrl: './action-log-list.component.html',
  styleUrl: './action-log-list.component.css'
})
export class ActionLogListComponent implements OnInit {
  data: {
    actionLog_id: number,
    regulation_based: string,
    action_nbr: string,
    reference_PACLR_nbr: string,
    issued_date: Date,
    action_description: string,
    audit_area: string,
    status: string,
    implementationAction_date: Date,
    evidence: string,
    close_date: Date

  }[] = [];
  search: string = '';
  formattedIssuedDate: { day: string; month: string; year: string }[] = [];

  sortState = {
    regulation_based: 0,
    action_nbr: 0,
    reference_PACLR_nbr: 0,
    issued_date: 0,
    action_description: 0,
    audit_area: 0,
  };

  constructor(
    private readonly actionLogService: ActionLogService,
    private router: Router,
    private datePipe: DatePipe
  ) { }
  visibility: string = '';
  ngOnInit(): void {
    this.loadActionLogs();
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
    const formattedData = this.data.map(item => {
      return {
        'Regulation Based': item.regulation_based,
        'Action Number': item.action_nbr,
        'Reference PACLR Number': item.reference_PACLR_nbr,
        'Issued Date': this.datePipe.transform(item.issued_date, 'dd-MMMM-yyyy'),
        'Action Description': item.action_description,
        'Audit Area': item.audit_area,
        'Status': item.status,
        'Implementation Action Date': this.datePipe.transform(item.implementationAction_date, 'dd-MMMM-yyyy'),
        'Evidence': item.evidence,
        'Close Date': this.datePipe.transform(item.close_date, 'dd-MMMM-yyyy')
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'NCR Data');

    XLSX.writeFile(wb, 'action-log-data.xlsx');
  }


  @ViewChild('contentContainer') contentContainer!: ElementRef;
  isScrollable = false;

  ngAfterViewChecked() {
    this.isScrollable = this.contentContainer.nativeElement.scrollHeight > this.contentContainer.nativeElement.clientHeight;
  }

  isModalOpen: boolean = false;
  currentActionLogId: number | null = null;

  openModal(id: number) {
    this.isModalOpen = true;
    this.currentActionLogId = id;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentActionLogId = null;
  }

  confirmDelete() {
    if (this.currentActionLogId !== null) {
      this.actionLogService.deleteActionLog(this.currentActionLogId).subscribe(
        (response) => {
          console.log('Deleted successfully:', response);
          this.loadActionLogs();
        },
        (error) => {
          console.error('Error deleting NCR:', error);
        }
      );
    }
    this.closeModal();
  }

  loadActionLogs() {
    this.actionLogService.getActionLogs(this.search).subscribe(actionLogs => {
      this.data = actionLogs;

      this.formattedIssuedDate = this.data.map(item => {
        const formattedDate = this.datePipe.transform(item.issued_date, 'dd-MMM-yyyy') || '';
        const [day, month, year] = formattedDate.split('-');
        return { day, month, year };
      }) as { day: string; month: string; year: string }[];

      console.log(this.data);
    });
  }



  onSearchChange(searchQuery: string) {
    this.search = searchQuery;
    this.loadActionLogs();
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
        this.loadActionLogs();
        break;
    }
  }
}

