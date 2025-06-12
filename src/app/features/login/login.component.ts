import { Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { UserDTO } from '../../shared/models/user';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ValidationErrors,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth.service';

const validEmailExpression = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    return emailRegex.test(value) ? null : { invalidEmail: true };
  };
};
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  users = signal<UserDTO[]>([]);
  selectedUser: string = '';
  loginError = signal(false);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  form = this.fb.group({
    email: this.fb.nonNullable.control('', {
      validators: [Validators.required, validEmailExpression],
      updateOn: 'blur',
    }),
    password: this.fb.nonNullable.control('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
  });

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, validEmailExpression],
    }),
    password: new FormControl('', { validators: [Validators.required] }),
  });
  loginService = inject(LoginService);

  ngOnInit(): void {
    this.loginService.getUsers().subscribe({
      next: (u) => this.users.set(u),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;
    if (!email || !password) {
      return;
    }
    this.loginService.login({ email, password }).subscribe((user) => {
      if (!user) {
        this.loginError.set(true);
        return;
      }
      this.loginError.set(false);
      this.authService.login(user);
    });
  }

  
}
