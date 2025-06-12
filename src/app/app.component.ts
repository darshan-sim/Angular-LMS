import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'practical-07';
  loggedInPermission = signal(false);
  constructor(private authService: AuthService) {
    effect(() => this.loggedInPermission.set(authService.isLoggedIn()));
  }
}
