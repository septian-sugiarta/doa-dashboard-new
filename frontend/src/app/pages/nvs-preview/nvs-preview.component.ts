import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NvsFormService } from '../../services/nvs-form/nvs-form.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-nvs-preview',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './nvs-preview.component.html',
  providers: [DatePipe]
})
export class NvsPreviewComponent implements OnInit {
  data: any;
  nvsData: any = null;
  constructor(
    private route: ActivatedRoute,
    private nvsFormService: NvsFormService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const ncrId = this.route.snapshot.paramMap.get('ncrId');
    if (ncrId) {
      this.loadData(Number(ncrId));
    }
  }

  loadData(ncrId: number): void {
  this.nvsFormService.getNvsByNcrId(ncrId).subscribe(
    (res: any) => {
      console.log('Data loaded:', res);
      this.data = res;
    },
    (err) => console.error('Failed to load NVS data', err)
  );
}

  getFormattedResultDate() {
    return this.datePipe.transform(this.data?.resultDate, 'dd-MMM-yyyy');  // sesuaikan dengan nvsData
  }

  getFormattedVerifiedDate() {
    return this.datePipe.transform(this.data?.verifiedDate, 'dd-MMM-yyyy');  // sesuaikan dengan nvsData
  }
  shouldCheckReminder(reminder: string | null | undefined): boolean {
    if (!reminder) return false;

    const trimmed = reminder.trim();

    // False jika kosong atau hanya berisi tanda minus (-)
    if (trimmed === '-' || trimmed === '') return false;

    return true; // Centang jika ada isi selain "-" saja
  }

  convertToPDF() {
    const data = document.getElementById('contentToConvert');
    if (data) {
      html2canvas(data, { scale: 2 }).then(canvas => {
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jspdf('p', 'mm', 'a4', true);
        let position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('nvs-preview.pdf');
      });
    }
  }
}