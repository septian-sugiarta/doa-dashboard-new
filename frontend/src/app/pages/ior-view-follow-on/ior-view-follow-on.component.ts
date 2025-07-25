import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule, DatePipe } from '@angular/common';
import { IorFormService } from '../../services/ior-form/ior-form.service';
import { ActivatedRoute } from '@angular/router';
import { IorFollowOnService } from '../../services/ior-follow-on/ior-follow-on.service';

@Component({
  selector: 'app-ior-view-follow-on',
  imports: [ButtonComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './ior-view-follow-on.component.html',
  styleUrl: './ior-view-follow-on.component.css'
})
export class IorViewFollowOnComponent implements OnInit {

  data: {
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
    initial_riskindex: string,
    follup_detail: string,
    follupby: string,
    follup_uic: string,
    follup_date: Date,
    follup_datarefer: string,
    follup_status: string,
    nextuic_follup: string,
    current_probability: string,
    current_severity: string,
    current_riskindex: string,
    iorId: number,
    iorFollowOn?: any
  } | null = null;

  constructor(private readonly iorFormService: IorFormService, private iorFollowOnService: IorFollowOnService,
    private datePipe: DatePipe, private route: ActivatedRoute) { }


  ngOnInit(): void {
    const iorId = this.route.snapshot.paramMap.get('id_IOR');
    console.log('id_IOR:', iorId);
    if (this.data) {
      this.data.iorId = Number(iorId);
    }

    if (iorId) {
      this.loadFormData(Number(iorId));
      this.loadFollowOnData(Number(iorId));
    }
  }

  loadFormData(id_IOR: number): void {
    this.iorFormService.getIorForm(id_IOR).subscribe(
      (data) => {

        this.data = { ...this.data, ...data };
      },
      (error) => {
        console.error('Error fetching NCR data:', error);
      }
    );
  }

  loadFollowOnData(id_IOR: number): void {
    this.iorFollowOnService.getIorFollowOn(id_IOR).subscribe(
      (data) => {
        this.data = { ...this.data, ...data, ncrFollowOnId: data.iorFollowOn_id };
      },
      (error) => {
        console.error('Error fetching NCR reply data:', error);
      }
    );
  }

  getFormattedOccurDate() {
    return this.datePipe.transform(this.data?.occur_date, 'dd MMMM yyyy');
  }
  getFormattedReportDate() {
    return this.datePipe.transform(this.data?.report_date, 'dd MMMM yyyy');
  }
  getFormattedFollupDate() {
    return this.datePipe.transform(this.data?.follup_date, 'dd MMMM yyyy');
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
        pdf.text('Form No. GMF/IM/E-013', 25, pageHeight - 10);
        pdf.text(`Page ${currentPage} of ${totalPages}`, imgWidth - 35, pageHeight - 10);

        heightLeft -= pageHeight;
        position -= pageHeight;

        if (heightLeft > 0) {
          pdf.addPage();
          currentPage++;
        }
      }

      const docNbr = this.data?.occur_nbr || 'UnknownDocNbr';
      const formattedDocNbr = docNbr.replace('/', '-');
      pdf.save(`${formattedDocNbr}.pdf`);
    });
  }

}


