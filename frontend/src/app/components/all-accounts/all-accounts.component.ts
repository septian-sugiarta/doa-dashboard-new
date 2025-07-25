import { afterNextRender, Component, ElementRef, ViewChild } from '@angular/core';
import { SortButtonComponent } from '../../shared/sort-button/sort-button.component';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-accounts',
  imports: [SortButtonComponent, CommonModule],
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.css']
})
export class AllAccountsComponent {
  data: {
    id_number: number;
    name: string;
    unit: string;
    role: string;
    email?: string;
    username: string;
    password: string;
  }[] = [];

  sortState = {
    id_number: 0,
    name: 0,
    unit: 0,
    role: 0,
    email: 0,
    username: 0,
  };

  constructor(private readonly usersService: UsersService) { }

  ngOnInit() {
    console.log('oke');
    this.usersService.getUsers().subscribe(data => {
      if (data && data.length > 0) {
        this.data = data;
      } else {
        this.data = [];
      }
      console.log(this.data);
    });
  }

  @ViewChild('contentContainer') contentContainer!: ElementRef;
  isScrollable = false;

  ngAfterViewChecked() {
    this.isScrollable = this.contentContainer.nativeElement.scrollHeight > this.contentContainer.nativeElement.clientHeight;
  }


  sortData(column: keyof typeof this.sortState) {
    this.sortState[column] = (this.sortState[column] + 1) % 3;

    switch (this.sortState[column]) {
      case 1:
        this.data.sort((a, b) => {
          if (typeof a[column] === 'string' && typeof b[column] === 'string') {
            return (a[column] as string).localeCompare(b[column] as string);
          } else if (typeof a[column] === 'number' && typeof b[column] === 'number') {
            return (a[column] as number) - (b[column] as number);
          }
          return 0;
        });
        break;
      case 2:
        this.data.sort((a, b) => {
          if (typeof a[column] === 'string' && typeof b[column] === 'string') {
            return (b[column] as string).localeCompare(a[column] as string);
          } else if (typeof a[column] === 'number' && typeof b[column] === 'number') {
            return (b[column] as number) - (a[column] as number);
          }
          return 0;
        });
        break;
      default:
        this.usersService.getUsers().subscribe((data: { id_number: number; name: string; unit: string; role: string; username: string; password: string }[]) => {
          if (data && data.length > 0) {
            this.data = data;
          } else {
            this.data = [];
          }
        });
        break;
    }
  }
}
