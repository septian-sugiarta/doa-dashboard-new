import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-area-input.component.html',
  styleUrl: './text-area-input.component.css'
})
export class TextAreaInputComponent {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() required: boolean = false;
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  isInvalid: boolean = false;
  errorMessage: string = '';

  adjustTextareaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
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
}
