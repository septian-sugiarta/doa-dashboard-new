import { Component, Input, Type } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  @Input() tabs: { label: string; value: string; content: Type<any> }[] = [];
  @Input() defaultTab: string = '';

  activeTab: string = '';
  activeComponent!: Type<any>;

  gridColumns: number = 2;

  ngOnInit() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = atob(base64);
      const decodedObject = JSON.parse(decodedPayload);

      const role = decodedObject.role;
      this.gridColumns = (role === 'admin' || role === 'IM') ? 5 : 2;
    }

    if (this.tabs.length > 0) {
      this.activeTab = this.defaultTab || this.tabs[0].value;
      this.activeComponent = this.tabs.find(tab => tab.value === this.activeTab)?.content!;
    }
  }

  setActiveTab(tabValue: string) {
    this.activeTab = tabValue;
    this.activeComponent = this.tabs.find(tab => tab.value === tabValue)?.content!;
  }
}
