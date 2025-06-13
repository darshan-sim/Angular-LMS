import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe, UserCardComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);

  users$!: Observable<User[]>;
  isLoading = signal(false);
  errorMessage = '';

  ngOnInit() {
    this.fetchUsers();
  }
  
  private fetchUsers() {
    console.log('fetching');
    this.isLoading.set(true);
    this.users$ = this.userService.getUsers().pipe(
      tap((users) => {
        console.log('Received users:', users);
      }),
      finalize(() => {
        this.isLoading.set(false);
        console.log({ isLoading: this.isLoading });
      }),
      catchError((err) => {
        this.errorMessage = 'Failed to fetch users';
        console.error('Error fetching users:', err);
        this.isLoading.set(false);
        return EMPTY;
      })
    );
  }
}
