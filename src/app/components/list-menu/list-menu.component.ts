import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItems } from 'src/app/shared/interfaces/menu-items';

@Component({
    selector: 'app-list-menu',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './list-menu.component.html',
    styleUrl: './list-menu.component.css'
})
export class ListMenuComponent {
  menu: MenuItems[] = [
    { text: 'Authors Table', routerLink: '../author-table'},
    { text: 'Books Table', routerLink: '../book-table'},
    { text: 'Users Table', routerLink: '../user-table'},
  ]

}
