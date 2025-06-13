import { Component, input } from '@angular/core';
import { Department } from '../department.model';
import { flush } from '@angular/core/testing';
import { TableUserComponent } from "../../users/table-user/table-user.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  imports: [ TableUserComponent, CommonModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent {
  department = input.required<Department>();
  isCollapse = false;
  onCollapse() {
    this.isCollapse = !this.isCollapse;
  }
}
