import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItems } from 'src/app/shared/interfaces/menu-items';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
    selector: 'app-user-dashboard',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
    userService = inject(UserService);
    username: string;
    menu: MenuItems[] = [];

  constructor() {
    this.username = this.userService.getUsername();
  }

  ngOnInit(): void {
    this.userService.getUserByUsername(this.username).subscribe(
      (user: User) => {
        this.menu = [
          { text: 'User Details', routerLink: `/update-user-profile/${user.id}`},
          { text: 'Books', routerLink: `/book-table-for-user/${user.id}`}
        ];
      },
      (error) => {
        console.error('Error fetching user:', error);     
      }
    );
  }
}
