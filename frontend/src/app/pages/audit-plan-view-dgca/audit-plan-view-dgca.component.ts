import { Component } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audit-plan-view-dgca',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './audit-plan-view-dgca.component.html',
  styleUrl: './audit-plan-view-dgca.component.css'
})
export class AuditPlanViewDgcaComponent {
  public convertToPDF() {
    var data = document.getElementById('contentToConvert');
    if (data) {
      html2canvas(data, { scale: 2 }).then(canvas => {
        var imgWidth = 297;
        var pageHeight = 210;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jspdf('l', 'mm', 'a4', true);
        let position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);


        pdf.save('new-file.pdf');
      });
    }
  }
}
