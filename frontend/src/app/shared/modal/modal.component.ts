import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() extraClasses: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmActionEvent = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }

  confirmAction() {
    this.confirmActionEvent.emit();
    this.closeModal();
  }
}
