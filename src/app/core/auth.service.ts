import { computed, inject, Injectable, signal } from '@angular/core';
import { UserDTO } from '../shared/models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  router = inject(Router);

  private userSignal = signal<UserDTO | null>(this.getUserFromLocalStorage());
  constructor(){
    this.setUserToLocalStorage()
  }

  get user() {
    return this.userSignal.asReadonly();
  }

  getUserFromLocalStorage(): UserDTO | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  setUserToLocalStorage(): void {
    const user = {
      id: '1',
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    };
    localStorage.setItem('user', JSON.stringify(user));
  }
}
