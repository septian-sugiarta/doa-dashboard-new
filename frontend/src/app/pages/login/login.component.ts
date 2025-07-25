import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputLoginComponent } from '../../components/input-login/input-login.component';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, CommonModule, InputLoginComponent],
  providers: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() username: string = '';
  @Input() password: string = '';
  @Input() rememberMe: boolean = false;
  passwordTooShortErrorMessage: string = '';
  passwordErrorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.passwordTooShortErrorMessage = '';
    this.passwordErrorMessage = '';

    if (this.password.length < 8) {
      this.passwordTooShortErrorMessage = 'Password must be at least 8 characters.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.passwordErrorMessage = '';
        this.authService.setToken(response.access_token);
        this.router.navigate(['/']);
      },
      (error) => {
        this.passwordErrorMessage = 'Incorrect password.';
      }
    );
  }

  clearPasswordErrorMessage() {
    this.passwordErrorMessage = '';
  }
}

