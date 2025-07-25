import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-sort-button',
  imports: [CommonModule],
  templateUrl: './sort-button.component.html',
  styleUrl: './sort-button.component.css'
})
export class SortButtonComponent {
  @Input() sortState: number = 0;
  @ContentChild('sortLabel', { static: true }) contentElement?: ElementRef;
  content: string = '';

  ngAfterContentInit() {
    if (this.contentElement) {
      this.content = this.contentElement.nativeElement.textContent.trim();
    }
  }

  toggleSort() {
    this.sortState = (this.sortState + 1) % 3;
  }
}
