import { afterNextRender, Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ButtonComponent } from '../../shared/button/button.component';
import { NcrFormService } from '../../services/ncr-form/ncr-form.service';
import { CommonModule, DatePipe } from '@angular/common';
import { IorFormService } from '../../services/ior-form/ior-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ior-view',
  imports: [ButtonComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './ior-view.component.html',
  styleUrl: './ior-view.component.css'
})
export class IorViewComponent implements OnInit {

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
    initial_riskindex: string
  } | null = null;

  constructor(private readonly iorFormService: IorFormService, private datePipe: DatePipe, private route: ActivatedRoute) { }


  ngOnInit(): void {
    const iorId = this.route.snapshot.paramMap.get('id_IOR');
    console.log('id_IOR:', iorId);

    if (iorId) {
      this.loadData(Number(iorId));
    }
  }

  loadData(id_IOR: number): void {
    this.iorFormService.getIorForm(id_IOR).subscribe(
      (data: any) => {
        if (data) {
          this.data = data as {
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
            initial_riskindex: string
          };
        } else {
          this.data = null;
        }
        console.log(this.data);
      },
      (error) => {
        console.error('Error fetching IOR data:', error);
      });
  }

  getFormattedOccurDate() {
    return this.datePipe.transform(this.data?.occur_date, 'dd MMMM yyyy');
  }
  getFormattedReportDate() {
    return this.datePipe.transform(this.data?.report_date, 'dd MMMM yyyy');
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
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('new-file.pdf');
      });
    }
  }

}
