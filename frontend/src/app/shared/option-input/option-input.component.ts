import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-option-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './option-input.component.html',
  styleUrl: './option-input.component.css'
})
export class OptionInputComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() options: { value: string; label: string }[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() required: boolean = false;
  @Input() class: string = '';
  @Input() value: string = '';

  @Input() readonly: boolean = false;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  isInvalid: boolean = false;
  errorMessage: string = '';

  validateInput(): void {
    if (this.required && (!this.value || this.value === '')) {
      this.isInvalid = true;
      this.errorMessage = 'This field is required.';
    } else {
      this.isInvalid = false;
      this.errorMessage = '';
    }

    this.valueChange.emit(this.value);
  }

  onBlur(): void {
    this.validateInput();
  }
}
