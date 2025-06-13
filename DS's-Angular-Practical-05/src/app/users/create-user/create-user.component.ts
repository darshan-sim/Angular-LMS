import { Component, inject, output } from '@angular/core';
import { DepartmentService } from '../../departments/department.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule, NgIf],
  standalone: true,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  private departmentService = inject(DepartmentService);
  private userService = inject(UserService);
  dropdownDepartmentList = this.departmentService.getAllDepartment();

  username: string = '';
  email: string = '';
  salary: number = 0;
  password: string = '';
  designation: string = '';
  department: string = '';

  errors: { [key: string]: string } = {};

  close = output();

  onSubmit() {
    this.errors = {};

    if (this.errors['department']) {
      return;
    }
    console.log({
      name: this.username,
      email: this.email,
      department: this.department,
      designation: this.designation,
      password: this.password,
      salary: this.salary,
    });
    this.userService.addUser({
      name: this.username,
      email: this.email,
      department: this.department,
      designation: this.designation,
      password: this.password,
      salary: this.salary,
    });

    this.username = '';
    this.email = '';
    this.salary = 0;
    this.password = '';
    this.designation = '';
    this.department = '';
    this.onClose();
  }

  onClose() {
    this.close.emit();
  }
}
