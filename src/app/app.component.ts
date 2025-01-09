import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ListMenuComponent } from './components/list-menu/list-menu.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [MatIconModule,
              MatToolbarModule,
              NavbarComponent,
              RouterOutlet,
              ListMenuComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-library-frontend';
}
