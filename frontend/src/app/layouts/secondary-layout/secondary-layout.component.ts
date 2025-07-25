import { Component } from '@angular/core';
import { LoginNavbarComponent } from '../../components/login-navbar/login-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-secondary-layout',
  imports: [RouterOutlet, LoginNavbarComponent],
  templateUrl: './secondary-layout.component.html',
  styleUrl: './secondary-layout.component.css'
})
export class SecondaryLayoutComponent {

}
