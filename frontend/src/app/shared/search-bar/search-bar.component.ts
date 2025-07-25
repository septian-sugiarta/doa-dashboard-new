import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  search: string = '';

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchChanged.emit(input.value);
  }
}
