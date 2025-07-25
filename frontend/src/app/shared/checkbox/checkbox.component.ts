import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  @Input() checkboxes: { id: string; label: string; checked: boolean; disabled?: boolean }[] = [];

  @Input() required: boolean = false;
  @Input() selectedValues: any[] = [];
  @Output() selectedValuesChange = new EventEmitter<any[]>();

  isInvalid: boolean = false;
  errorMessage: string = '';

  onCheckboxChange(event: Event, value: any) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedValues.push(value);
    } else {
      this.selectedValues = this.selectedValues.filter(v => v !== value);
    }

    this.selectedValuesChange.emit(this.selectedValues);
    this.validateInput();
  }

  validateInput() {
    this.isInvalid = this.required && this.selectedValues.length === 0;
  }
}
