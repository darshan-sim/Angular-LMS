import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../department.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-department',
  imports: [FormsModule, NgIf],
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.css',
})
export class CreateDepartmentComponent {
  departmentName: string = '';
  errors: { [key: string]: string } = {};
  private departmentService = inject(DepartmentService);
  close = output<void>();

  onSubmit() {
    this.errors = {};
    if (!this.departmentService.addDepartment(this.departmentName)) {
      this.errors['department'] = 'Department already exists';
      return;
    }
    this.departmentName = '';
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
