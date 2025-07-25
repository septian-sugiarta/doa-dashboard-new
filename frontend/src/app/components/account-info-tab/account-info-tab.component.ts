import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-info-tab',
  imports: [TextInputComponent, CommonModule],
  templateUrl: './account-info-tab.component.html',
  styleUrls: ['./account-info-tab.component.css']
})
export class AccountInfoTabComponent implements OnInit {
  data: {
    id_number: string;
    name: string;
    unit: string;
    role: string;
    email: string;
    username: string;
  } | null = null;

  constructor(private readonly usersService: UsersService) { }

  ngOnInit() {
    console.log('oke');
    this.usersService.getUserProfile().subscribe(data => {
      if (data) {
        this.data = { ...data };
      } else {
        this.data = null;
      }
      console.log(this.data);
    });
  }
}
