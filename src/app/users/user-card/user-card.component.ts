import { Component, input } from '@angular/core';
import { User } from '../user.model';
import { PhoneNumberPipe } from '../../phone-number.pipe';

@Component({
  selector: 'app-user-card',
  imports: [PhoneNumberPipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  user = input<User>();
}
