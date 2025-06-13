import { Injectable, signal } from '@angular/core';
import { Department } from './department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private departments = signal<Department[]>([]);

  allDepartments = this.departments.asReadonly();


  addDepartment(name: string): boolean {
    const department = this.departments().find(department => department.name === name)
    if(department){
      return false
    }
    const newDept: Department = {
      id: new Date().getTime().toString(),
      name: name,
      totalUsers: 0,
    };
    this.departments.update((oldDepartments) => [newDept, ...oldDepartments]);
    return true
  }

  updateTotalUser(name: string) {
    this.departments.update((oldDepartments) =>
      oldDepartments.map((department) =>
        department.name === name
          ? {
              ...department,
              totalUsers: department.totalUsers + 1,
            }
          : department
      )
    );
  }

  getAllDepartment() {
    return this.allDepartments();
  }
  
}
