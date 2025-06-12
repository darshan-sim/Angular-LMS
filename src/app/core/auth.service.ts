import { computed, inject, Injectable, signal } from '@angular/core';
import { UserDTO } from '../shared/models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  router = inject(Router);

  private userSignal = signal<UserDTO | null>(this.getUserFromLocalStorage());
  readonly isLoggedIn = computed(() => this.userSignal() !== null)

  login(user: UserDTO) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSignal.set(user);
    this.router.navigate(['/home']);
  }

  get user() {
    return this.userSignal.asReadonly();
  }

  getUserFromLocalStorage(): UserDTO | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSignal.set(null);
    this.router.navigate(['/login']);
  }
}
