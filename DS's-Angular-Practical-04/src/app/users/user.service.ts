import { inject, Injectable, signal } from '@angular/core';
import { User } from './user.model';
import { DepartmentService } from '../departments/department.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private departmentService = inject(DepartmentService)

  constructor() {}
  addUser(data: { name: string; email: string; departmentId: string }): User {
    const newUser: User = {
      ...data,
      id: new Date().getTime().toString(),
    };
    this.departmentService.addNewUser(newUser)
    return newUser;
  }
}
