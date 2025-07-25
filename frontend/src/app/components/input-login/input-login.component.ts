import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-login.component.html',
  styleUrl: './input-login.component.css'
})
export class InputLoginComponent {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() class: string = '';
  @Input() maxlength: number | undefined;
  @Input() disabled: boolean = false;

  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  isInvalid: boolean = false;
  errorMessage: string = '';

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
}
