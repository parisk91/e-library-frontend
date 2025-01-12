import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListMenuComponent } from './components/list-menu/list-menu.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
              RouterOutlet,
              NavbarComponent,
              ListMenuComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-library-frontend';
}
