import { Component } from '@angular/core';
import { ListMenuComponent } from '../list-menu/list-menu.component';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [ListMenuComponent],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
