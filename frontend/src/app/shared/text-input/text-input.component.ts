import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() class: string = '';
  @Input() maxlength: number | undefined;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;

  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  isInvalid: boolean = false;
  errorMessage: string = '';

  ngOnChanges(): void {
    if (this.type === 'date' && this.value) {
      this.value = this.formatDate(this.value); 
    }
  }

  validateInput(): void {
    if (this.required && this.value.trim() === '') {
      this.isInvalid = true;
      this.errorMessage = 'This field is required.';
    } else {
      this.isInvalid = false;
      this.errorMessage = '';
    }

    this.valueChange.emit(this.value);
  }

  onBlur(): void {
    if (this.required && this.value.trim() === '') {
      this.isInvalid = true;
      this.errorMessage = 'This field is required.';
    }
  }

  private formatDate(date: string): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
