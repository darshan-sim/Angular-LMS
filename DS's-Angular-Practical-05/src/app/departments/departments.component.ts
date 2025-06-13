import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { DepartmentService } from './department.service';
import { DepartmentComponent } from './department/department.component';
import { Department } from './department.model';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [DepartmentComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent {
  private departmentService = inject(DepartmentService);

  allDepartments = this.departmentService.allDepartments;
  selectedDepartment = signal<Department | null>(null);

  onDepartmentSelect(event: Event) {
    console.log('changed');
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (value === 'all') {
      this.selectedDepartment.set(null);
    } else {
      this.selectedDepartment.set(
        this.allDepartments().find((dept) => dept.id === value) || null
      );
    }
  }
}
