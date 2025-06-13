import { inject, Injectable, signal } from '@angular/core';
import { User } from './user.model';
import { DepartmentService } from '../departments/department.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = signal<User[]>([]);
  allUsers = this.users.asReadonly();
  private departmentService = inject(DepartmentService);

  addUser(data: {
    name: string;
    email: string;
    department: string;
    salary: number;
    password: string;
    designation: string;
  }): User {
    const newUser: User = {
      ...data,
      id: new Date().getTime().toString(),
      createdAt: new Date(),
    };
    this.users.update((oldUsers) => [newUser, ...oldUsers]);
    console.log(this.users());
    this.departmentService.updateTotalUser(newUser.department);
    return newUser;
  }

  getUsersByDepartment(name: string) {
    console.log({ name });
    return this.allUsers().filter((user) => {
      console.log({ userDept: user.department });
      return user.department === name;
    });
  }
}
