import { Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { UserDTO } from '../../shared/models/user';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  users = signal<UserDTO[]>([]);
  selectedUser: string = '';

  loginService = inject(LoginService);

  ngOnInit(): void {
    this.loginService.getUsers().subscribe({
      next: (u) => this.users.set(u),
    });
  }

  onSubmit(){
    const user = this.users().find(user => user.id === this.selectedUser)
    if(user){
      this.loginService.login(user)
    }else{
      //show error toasts -
    }
  }
}
