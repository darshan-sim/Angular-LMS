import { inject, Injectable, signal } from '@angular/core';
import { UserService } from '../users/user.service';
import { Department } from './department.model';
import { User } from '../users/user.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private departments = signal<Department[]>([]);

  allDepartments = this.departments.asReadonly();

  constructor() {}

  addDepartment(data: { name: string }) {
    const newDept: Department = {
      ...data,
      id: new Date().getTime().toString(),
      users: [],
    };
    this.departments.update((oldDepartments) => [newDept, ...oldDepartments]);
  }

  addNewUser(user: User) {
    this.departments.update((oldDepartments) =>
      oldDepartments.map((department) =>
        department.id === user.departmentId
          ? {
              ...department,
              users: [user, ...department.users],
            }
          : department
      )
    );
  }

  getAllDepartmentNames(): Omit<Department, 'users'>[] {
    return this.allDepartments().map((department) => ({
      id: department.id,
      name: department.name,
    }));
  }

  getUsersByDepartment(departmentId: string): User[] {
    return this.allDepartments()
      .filter((department) => department.id === departmentId)
      .map((department) => department.users)
      .flat();
  }
}
