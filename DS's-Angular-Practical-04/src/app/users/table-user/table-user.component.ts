import { Component, effect, inject, input } from '@angular/core';
import { DepartmentService } from '../../departments/department.service';
import { User } from '../user.model';

@Component({
  selector: 'app-table-user',
  imports: [],
  templateUrl: './table-user.component.html',
  styleUrl: './table-user.component.css',
})
export class TableUserComponent {
  private departmentService = inject(DepartmentService);
  departmentId = input.required<string>();

  users: User[] = [];

  constructor() {
    effect(() => {
      const id = this.departmentId();
      this.users = this.departmentService.getUsersByDepartment(id);
    });
  }
}
