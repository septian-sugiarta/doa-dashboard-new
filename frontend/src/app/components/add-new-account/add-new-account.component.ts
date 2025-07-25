import { Component } from '@angular/core';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { UsersService } from '../../services/users/users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { emit } from 'node:process';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-account',
  standalone: true,
  imports: [TextInputComponent, ButtonComponent, CommonModule],
  providers: [FormsModule],
  templateUrl: './add-new-account.component.html',
  styleUrls: ['./add-new-account.component.css']
})
export class AddNewAccountComponent {
  constructor(private readonly usersService: UsersService, private router: Router,) { }

  formData = {
    id_number: '',
    name: '',
    unit: '',
    role: '',
    email: '',
    username: '',
    password: '',

  }

  errorMessage: string = '';
  onSubmit() {
    const userData = {
      ...this.formData,
      id_number: Number(this.formData.id_number)
    };

    if (this.formData.password.length < 8) {
      this.errorMessage = 'New password must be at least 8 characters.';
      return;
    }

    this.usersService.createUser(userData).subscribe(
      (response: any) => {
        console.log('Form submitted successfully');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error submitting form', error);
      }
    );
  }


}
