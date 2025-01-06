import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ListMenuComponent } from './components/list-menu/list-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, UserRegistrationComponent, UserLoginComponent, NavbarComponent, RouterOutlet, RouterLink, ListMenuComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-library-frontend';
}
