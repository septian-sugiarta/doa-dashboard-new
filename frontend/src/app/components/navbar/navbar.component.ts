import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private usersService: UsersService) { }

  isModalOpen = false;
  isMenuOpen = false;

  toggleMenu() {
    console.log('Toggling menu');
    this.isMenuOpen = !this.isMenuOpen;
  }
  isAuditOpen = false;
  toggleAuditDropdown() {
    this.isAuditOpen = !this.isAuditOpen;
  }


  openLogoutModal() {
    this.isModalOpen = true;
  }


  closeModal() {
    this.isModalOpen = false;
  }

  confirmLogout() {
    console.log('Logging out...');
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
    this.closeModal();
  }

  userRole: string = '';
  ngOnInit() {
    console.log('oke');
    this.usersService.getUserProfile().subscribe(data => {
      if (data && data.role) {
        this.userRole = data.role;
      } else {
        this.userRole = 'user';
      }
      console.log('User role:', this.userRole);
    });
  }

}
