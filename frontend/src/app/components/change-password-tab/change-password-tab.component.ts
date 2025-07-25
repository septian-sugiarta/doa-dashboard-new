import { Component } from '@angular/core';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-tab',
  standalone: true,
  imports: [TextInputComponent, ButtonComponent, CommonModule],
  providers: [FormsModule],
  templateUrl: './change-password-tab.component.html',
  styleUrl: './change-password-tab.component.css'
})
export class ChangePasswordTabComponent {
  constructor(private readonly usersService: UsersService, private router: Router) { }

  errorMessage: string = '';
  formData = {
    email: '',
    old_password: '',
    new_password: ''
  };

  onSubmit(): void {
    const { old_password, new_password, email } = this.formData;

    if (old_password.length < 8) {
      this.errorMessage = 'Current password must be at least 8 characters.';
      return;
    }
    if (new_password.length < 8) {
      this.errorMessage = 'New password must be at least 8 characters.';
      return;
    }

    this.usersService.validateOldPassword({ email, old_password }).subscribe(
      (response) => {
        if (response.isValid) {
          console.log('Old password is correct');
          this.usersService.changePassword({ email, old_password, new_password }).subscribe(
            (updateResponse) => {
              console.log('Password successfully updated');
              this.router.navigate(['/']);
            },
            (error) => {
              console.error('Error updating password', error);
              alert('Terjadi kesalahan saat memperbarui password');
            }
          );
        } else {
          console.error('Old password is incorrect');
          alert('Password lama salah');
        }
      },
      (error) => {
        console.error('Error deleting account', error);
        this.errorMessage = 'Incorrect email or password.';
      }
    );
  }

  clearPasswordErrorMessage() {
    this.errorMessage = '';
  }

}
