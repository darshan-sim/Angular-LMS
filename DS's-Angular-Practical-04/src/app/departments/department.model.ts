import { User } from '../users/user.model';

export interface Department {
  id: string;
  name: string;
  users: User[];
}
