
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NvsFormService } from '../../services/nvs-form/nvs-form.service';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { OptionInputComponent } from '../../shared/option-input/option-input.component';
import { TextAreaInputComponent } from '../../shared/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { NcrFormService } from '../../services/ncr-form/ncr-form.service';


@Component({
  selector: 'app-nvs-form',
  standalone: true,
  imports: [TextInputComponent, OptionInputComponent, TextAreaInputComponent, ButtonComponent],
  templateUrl: './nvs-form.component.html',
  styleUrls: ['./nvs-form.component.css']
})
export class NvsFormComponent implements OnInit {
  @Input() disabled: boolean = false;
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private ncrFormService: NcrFormService,
      private nvsFormService: NvsFormService,
    ) { }

  ncrId!: number;

  formData = {
    NCR_nbr:'',
    verification_no: '',
    ncr_no: '',
    verification_result: '',
    is_effective: '',
    reminder_no: '',
    verified_by: '',
    verified_date: ''
  };

  ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');

  if (!idParam || isNaN(Number(idParam))) {
    console.error('Invalid or missing NCR ID in route.');
    return;
  }

  this.ncrId = Number(idParam);
  this.loadFormData(this.ncrId); // << Tambahkan ini

  this.nvsFormService.getNvsByNcrId(this.ncrId).subscribe({
    next: (data) => {
      if (data) {
        this.formData = {
          ...this.formData,
          ...data
        };
      }
    },
    error: (err) => {
      console.error('Error fetching NVS data:', err);
    }
  });
}

  loadFormData(NCR_init_ID: number): void {
    this.ncrFormService.getNcrForm(NCR_init_ID).subscribe(
      (data) => {
        this.formData = { ...this.formData, ...data };
      },
      (error) => {
        console.error('Error fetching NCR data:', error);
      }
    );
  }

  onSubmit() {
    if (!this.ncrId || this.ncrId <= 0) {
      console.error('Invalid NCR ID. Cannot submit form.');
      return;
    }

    if (!this.formData.verification_no || !this.formData.NCR_nbr) {
      alert('Please fill required fields!');
      return;
    }
    

    console.log(this.formData)
    
    this.nvsFormService.saveNvsData(this.ncrId, this.formData).subscribe({
      next: (res) => {
        console.log('Success:', res);
        this.router.navigate(['/nvs-preview', this.ncrId]);
      },
      error: (err) => {
        console.error('Error submitting form', err);
        alert('Submission failed. Please check console.');
      }
    });
  }
}