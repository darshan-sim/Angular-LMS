import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-create-department',
  imports: [FormsModule],
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
    if (this.departmentName.trim() === '') {
      this.errors['department'] = 'Please enter department name';
      return;
    }
    this.departmentService.addDepartment({ name: this.departmentName });
    this.departmentName = '';
    this.close.emit()
  }
  onClose() {
    this.close.emit();
  }
}
