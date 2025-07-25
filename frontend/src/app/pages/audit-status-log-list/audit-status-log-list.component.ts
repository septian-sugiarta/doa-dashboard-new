import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { SortButtonComponent } from '../../shared/sort-button/sort-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Router, RouterModule } from '@angular/router';
import { AuditStatusLogService } from '../../services/audit-status-log/audit-status-log.service';

@Component({
  selector: 'app-audit-status-log-list',
  standalone: true,
  imports: [SortButtonComponent, ButtonComponent, SearchBarComponent, CommonModule, RouterModule, ModalComponent],
  providers: [DatePipe],
  templateUrl: './audit-status-log-list.component.html',
  styleUrl: './audit-status-log-list.component.css'
})
export class AuditStatusLogListComponent implements OnInit {
  data: {
    auditStatusLog_id: number,
    regulation_based: string,
    doc_nbr: string,
    statusLog_date: Date,
    subject: string,
    reason_of_issuance: string,
    prepared_by: string,
    prepared_date: Date,
    checked_by: string,
    checked_date: Date,

  }[] = [];
  search: string = '';
  formattedStatusLogDate: { day: string; month: string; year: string }[] = [];

  sortState = {
    regulation_based: 0,
    doc_nbr: 0,
    statusLog_date: 0,
    subject: 0,
    reason_of_issuance: 0,
  };

  constructor(
    private readonly auditStatusLogService: AuditStatusLogService,
    private router: Router,
    private datePipe: DatePipe
  ) { }
  visibility: string = '';
  ngOnInit(): void {
    this.loadAuditStatusLogs();
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
        'Doc Number': item.doc_nbr,
        'Status Log Date': this.datePipe.transform(item.statusLog_date, 'dd-MMMM-yyyy'),
        'Subject': item.subject,
        'Reason of Issuance': item.reason_of_issuance,
        'Prepared By': item.prepared_by,
        'Prepared Date': this.datePipe.transform(item.prepared_date, 'dd-MMMM-yyyy'),
        'Checked By': item.checked_by,
        'Checked Date': this.datePipe.transform(item.checked_date, 'dd-MMMM-yyyy')
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'NCR Data');

    XLSX.writeFile(wb, 'audit-status-log-data.xlsx');
  }

  @ViewChild('contentContainer') contentContainer!: ElementRef;
  isScrollable = false;

  ngAfterViewChecked() {
    this.isScrollable = this.contentContainer.nativeElement.scrollHeight > this.contentContainer.nativeElement.clientHeight;
  }

  isModalOpen: boolean = false;
  currentAuditStatusLogId: number | null = null;

  openModal(id: number) {
    this.isModalOpen = true;
    this.currentAuditStatusLogId = id;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentAuditStatusLogId = null;
  }

  confirmDelete() {
    if (this.currentAuditStatusLogId !== null) {
      this.auditStatusLogService.deleteAuditStatusLog(this.currentAuditStatusLogId).subscribe(
        (response) => {
          console.log('Deleted successfully:', response);
          this.loadAuditStatusLogs();
        },
        (error) => {
          console.error('Error deleting NCR:', error);
        }
      );
    }
    this.closeModal();
  }

  loadAuditStatusLogs() {
    this.auditStatusLogService.getAuditStatusLogs(this.search).subscribe(auditStatusLogs => {
      this.data = auditStatusLogs;

      this.formattedStatusLogDate = this.data.map(item => {
        const formattedDate = this.datePipe.transform(item.statusLog_date, 'dd-MMM-yyyy') || '';
        const [day, month, year] = formattedDate.split('-');
        return { day, month, year };
      }) as { day: string; month: string; year: string }[];

      console.log(this.data);
    });
  }



  onSearchChange(searchQuery: string) {
    this.search = searchQuery;
    this.loadAuditStatusLogs();
  }

  getViewLink(regulation: string, auditStatusLog_id: number): string[] {
    const auditStatusLogIdStr = auditStatusLog_id.toString();
    if (regulation === 'DGCA') {
      return ['/audit-status-log-view-dgca', auditStatusLogIdStr];
    } else if (regulation === 'EASA') {
      return ['/audit-status-log-view-easa', auditStatusLogIdStr];
    } else {
      return [];
    }
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
        this.loadAuditStatusLogs();
        break;
    }
  }
}


