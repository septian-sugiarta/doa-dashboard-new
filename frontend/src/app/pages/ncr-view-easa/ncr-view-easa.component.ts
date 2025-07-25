import { afterNextRender, Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ButtonComponent } from '../../shared/button/button.component';
import { NcrFormService } from '../../services/ncr-form/ncr-form.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ncr-view-easa',
  imports: [ButtonComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './ncr-view-easa.component.html',
  styleUrl: './ncr-view-easa.component.css'
})
export class NcrViewEasaComponent implements OnInit {
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
    Remark: string
  } | null = null;

  constructor(private readonly ncrFormService: NcrFormService, private datePipe: DatePipe, private route: ActivatedRoute) {

  }
  ngOnInit(): void {

    const ncrInitId = this.route.snapshot.paramMap.get('NCR_init_ID');
    console.log('NCR Init ID:', ncrInitId);

    if (ncrInitId) {
      this.loadData(Number(ncrInitId));
    }
  }

  loadData(NCR_init_ID: number): void {
    this.ncrFormService.getNcrForm(NCR_init_ID).subscribe(
      (data: any) => {
        if (data && data.RegulationBased === 'EASA') {
          this.data = data as {
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
            Remark: string
          };
        } else {
          this.data = null;
        }
        console.log(this.data);
      },
      (error) => {
        console.error('Error fetching NCR data:', error);
      });
  }

  getFormattedIssuedDate() {
    return this.datePipe.transform(this.data?.Issued_date, 'dd-MMM-yyyy');
  }

  getFormattedAnswerDueDate() {
    return this.datePipe.transform(this.data?.Answer_due_date, 'dd-MMM-yyyy');
  }
  getFormattedAuditDate() {
    return this.datePipe.transform(this.data?.Audit_Date, 'dd-MMM-yyyy');
  }

  getFormattedAcknowledgeDate() {
    return this.datePipe.transform(this.data?.Acknowledge_date, 'dd-MMM-yyyy');
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
