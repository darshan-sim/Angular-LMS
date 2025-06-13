import { Component, effect, inject, input } from '@angular/core';
import { DepartmentService } from '../../departments/department.service';
import { User } from '../user.model';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-table-user',
  imports: [DatePipe],
  templateUrl: './table-user.component.html',
  styleUrl: './table-user.component.css',
})
export class TableUserComponent {
  private userService = inject(UserService);
  departmentName = input.required<string>();

  users: User[] = [];

  constructor() {
    effect(() => {
      const name = this.departmentName();
      this.users = this.userService.getUsersByDepartment(name);
      console.log(this.users);
      console.log(name);
    });
  }
}
