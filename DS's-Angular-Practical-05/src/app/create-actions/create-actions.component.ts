import { Component } from '@angular/core';
import { takeUntil } from 'rxjs';
import { CreateDepartmentComponent } from '../departments/create-department/create-department.component';
import { CreateUserComponent } from "../users/create-user/create-user.component";

@Component({
  selector: 'app-create-actions',
  imports: [CreateDepartmentComponent, CreateUserComponent],
  templateUrl: './create-actions.component.html',
  styleUrl: './create-actions.component.css',
})
export class CreateActionsComponent {
  isCreatingDepartment = false;
  isCreatingUser = false;

  onCreateDepartmentButtonClick() {
    this.isCreatingDepartment = this.isCreatingDepartment ? false : true;
    this.isCreatingUser = false;
  }

  onCreateUserButtonClick() {
    this.isCreatingUser = this.isCreatingUser ? false : true;
    this.isCreatingDepartment = false;
  }
}
