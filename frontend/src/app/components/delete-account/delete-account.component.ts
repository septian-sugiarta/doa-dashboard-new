import { Component } from '@angular/core';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-account',
  imports: [TextInputComponent, ButtonComponent, CommonModule],
  providers: [FormsModule],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent {
  constructor(private readonly usersService: UsersService, private router: Router) { }

  formData = {
    email: '',
    password: '',
    confirm_password: ''
  }
  errorMessage: string = '';

  onSubmit(): void {
    if (!this.formData.email || !this.formData.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    if (this.formData.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }
    if (this.formData.confirm_password.length < 8) {
      this.errorMessage = 'Confirm password must be at least 8 characters.';
      return;
    }
    this.usersService.deleteUser(this.formData.email, this.formData.password).subscribe(
      (response) => {
        console.log('Account deleted successfully');
        this.router.navigate(['/']);
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
