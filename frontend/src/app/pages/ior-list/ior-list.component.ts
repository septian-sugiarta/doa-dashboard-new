import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { SortButtonComponent } from '../../shared/sort-button/sort-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { IorFormService } from '../../services/ior-form/ior-form.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { IorFollowOnService } from '../../services/ior-follow-on/ior-follow-on.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ior-list',
  imports: [SortButtonComponent, ButtonComponent, SearchBarComponent, CommonModule, RouterModule, ModalComponent],
  providers: [DatePipe],
  templateUrl: './ior-list.component.html',
  styleUrl: './ior-list.component.css'
})
export class IorListComponent implements OnInit {
  data: {
    id_IOR: number,
    status: string,
    iorformStatus: string,

    subject_ior: string,
    occur_nbr: string,
    occur_date: Date,
    reference_ior: string,
    to_uic: string,
    cc_uic: string,
    category_occur: string,
    type_or_pnbr: string,
    level_type: string,
    detail_occurance: string,
    Reportedby: string,
    reporter_uic: string,
    report_date: Date,
    reporter_identity: string,
    data_reference: string,
    hirac_process: string,
    Initial_probability: string,
    initial_severity: string,
    follup_detail?: string,
    follupby?: string,
    follup_uic?: string,
    follup_date?: Date,
    follup_datarefer?: string,
    follup_status?: string,
    nextuic_follup?: string,
    current_probability?: string,
    current_severity?: string,
    current_riskindex?: string,
    initial_riskindex?: string,


    iorfollowonStatus?: string
  }[] = [];
  search: string = '';

  formattedOccurDate: { day: string; month: string; year: string }[] = [];
  sortState = {
    subject_ior: 0,
    occur_nbr: 0,
    occur_date: 0,
    to_uic: 0,
    category_occur: 0,
    status: 0
  };

  constructor(
    private readonly iorFormService: IorFormService,
    private readonly iorFollowOnService: IorFollowOnService,
    private router: Router,
    private datePipe: DatePipe) { }
  visibility: string = '';
  ngOnInit(): void {
    this.loadIorForms();
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
    this.iorFormService.getIorForms(this.search).subscribe(iorForms => {
      console.log('Received NcrForm Data:', iorForms);

      forkJoin([
        this.iorFollowOnService.getIorFollowOns(),

      ]).subscribe(([iorFollowOns]) => {
        console.log('Received NcrReply Data:', iorFollowOns);

        const formattedData = iorForms.map(item => {
          const iorFollowOn = Array.isArray(iorFollowOns) ? iorFollowOns.find(followOn => followOn.iorId === item.id_IOR) : null;


          return {
            'Subject IOR': item.subject_ior,
            'Occur Nbr': item.occur_nbr,
            'Occur Date': this.datePipe.transform(item.occur_date, 'dd-MMMM-yyyy'),
            'Reference IOR': item.reference_ior,
            'To UIC': item.to_uic,
            'CC UIC': item.cc_uic,
            'Category Occur': item.category_occur,
            'Type OR PNRB': item.type_or_pnbr,
            'Level Type': item.level_type,
            'Detail Occurrence': item.detail_occurance,
            'Reported By': item.Reportedby,
            'Reporter UIC': item.reporter_uic,
            'Report Date': this.datePipe.transform(item.report_date, 'dd-MMMM-yyyy'),
            'Reporter Identity': item.reporter_identity,
            'Data Reference': item.data_reference,
            'HIRAC Process': item.hirac_process,
            'Initial Probability': item.Initial_probability,
            'Initial Severity': item.initial_severity,
            'Follow-up Detail': iorFollowOn ? iorFollowOn.follup_detail : item.follup_detail,
            'Follow-up By': iorFollowOn ? iorFollowOn.follupby : item.follupby,
            'Follow-up UIC': iorFollowOn ? iorFollowOn.follup_uic : item.follup_uic,
            'Follow-up Date': iorFollowOn ? this.datePipe.transform(iorFollowOn.follup_date, 'dd-MMMM-yyyy') : this.datePipe.transform(item.follup_date, 'dd-MMMM-yyyy'),
            'Follow-up Data Reference': iorFollowOn ? iorFollowOn.follup_datarefer : item.follup_datarefer,
            'Follow-up Status': iorFollowOn ? iorFollowOn.follup_status : item.follup_status,
            'Next UIC Follow-up': iorFollowOn ? iorFollowOn.nextuic_follup : item.nextuic_follup,
            'Current Probability': iorFollowOn ? iorFollowOn.current_probability : item.current_probability,
            'Current Severity': iorFollowOn ? iorFollowOn.current_severity : item.current_severity,
            'Current Risk Index': iorFollowOn ? iorFollowOn.current_riskindex : item.current_riskindex,
            'Initial Risk Index': iorFollowOn ? iorFollowOn.initial_riskindex : item.initial_riskindex,

            'IOR Follow-on Status': iorFollowOn ? iorFollowOn.iorfollowonStatus : 'No Follow-on Status'
          };
        });


        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);


        const wb: XLSX.WorkBook = XLSX.utils.book_new();


        XLSX.utils.book_append_sheet(wb, ws, 'NCR Data');


        XLSX.writeFile(wb, 'ior-data.xlsx');
      });
    });
  }

  @ViewChild('contentContainer') contentContainer!: ElementRef;
  isScrollable = false;

  ngAfterViewChecked() {
    this.isScrollable = this.contentContainer.nativeElement.scrollHeight > this.contentContainer.nativeElement.clientHeight;
  }

  isModalOpen: boolean = false;
  currentIorId: number | null = null;

  openModal(id: number) {
    this.isModalOpen = true;
    this.currentIorId = id;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentIorId = null;
  }

  confirmDelete() {
    if (this.currentIorId !== null) {
      this.iorFormService.deleteIorForm(this.currentIorId).subscribe(
        (response) => {
          console.log('Deleted successfully:', response);
          this.loadIorForms();
        },
        (error) => {
          console.error('Error deleting NCR:', error);
        }
      );
    }
    this.closeModal();
  }

  loadIorForms() {
    forkJoin([
      this.iorFormService.getIorForms(this.search),
      this.iorFollowOnService.getIorFollowOns(),
    ]).subscribe(([iorForms, iorFollowOns]) => {
      console.log('Received iorForms Data:', iorForms);
      console.log('Received iorFollowOns Data:', iorFollowOns);


      this.data = iorForms.map(item => {
        const iorFollowOn = Array.isArray(iorFollowOns)
          ? iorFollowOns.find(followOn => followOn.iorId === item.id_IOR)
          : null;


        return this.getStatusFromModels(item, iorFollowOn);
      });

      this.formattedOccurDate = this.data.map(item => {
        const formattedDate = this.datePipe.transform(item.occur_date, 'dd-MMM-yyyy') || '';
        const [day, month, year] = formattedDate.split('-');
        return { day, month, year };
      }) as { day: string; month: string; year: string }[];

      console.log(this.data);
    });
  }

  getStatusFromModels(item: any, iorFollowOn: any): any {
    if (item.iorformStatus === 'Follow On' && iorFollowOn?.iorfollowonStatus === 'Finish') {
      item.status = 'Finish';
    } else if (item.iorformStatus === 'Follow On') {
      item.status = 'Follow On';
    } else {
      item.status = 'Tunggu';
    }

    localStorage.setItem(item.id_IOR.toString(), item.status);

    return item;
  }

  getRouterLink(item: any, iorFollowOn: any): any {
    if (item.iorformStatus === 'Follow On' && iorFollowOn?.iorfollowonStatus === 'Finish') {
      item.status = 'Finish';
    } else if (item.iorformStatus === 'Follow On') {
      item.status = 'Follow On';
    } else {
      item.status = 'Tunggu';
    }

    localStorage.setItem(item.id_IOR.toString(), item.status);

    return item;
  }

  getNcrLink(id_IOR: number, status: string): string[] {
    const iorIdStr = id_IOR.toString();

    if (status === 'Follow On') {

      return ['/ior-view-form', iorIdStr];

    } else if (status === 'Finish') {

      return ['/ior-view-follow-on', iorIdStr];

    }


    return ['/waiting'];
  }






  onSearchChange(searchQuery: string) {
    this.search = searchQuery;
    this.loadIorForms();
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
        this.loadIorForms();
        break;
    }
  }

}

