import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';
import { CreateActionsComponent } from './create-actions/create-actions.component';

@Component({
  selector: 'app-root',
  imports: [DepartmentsComponent, CreateActionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Practical-04';
}
