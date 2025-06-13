import { Component, inject, output } from '@angular/core';
import { DepartmentService } from '../../departments/department.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  private departmentService = inject(DepartmentService);
  private userService = inject(UserService);
  dropdownDepartmentList = this.departmentService.getAllDepartmentNames();

  username: string = '';
  email: string = '';
  departmentId: string = '';

  errors: { [key: string]: string } = {};

  close = output();

  onSubmit() {
    this.errors = {};
    if (!this.username.trim()) {
      this.errors['username'] = 'Username is required.';
    }

    if (!this.email.trim()) {
      this.errors['username'] = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.errors['email'] = 'Please enter a valid email address.';
    }

    if (!this.departmentId.trim()) {
      this.errors['departmentId'] = 'Please select a department.';
    }
    if (
      this.errors['username'] ||
      this.errors['email'] ||
      this.errors['departmentId']
    ) {
      return;
    }
    this.userService.addUser({
      name: this.username,
      email: this.email,
      departmentId: this.departmentId,
    });
    this.username = '';
    this.email = '';
    this.departmentId = '';
  }
  onClose() {
    this.close.emit();
  }
}
