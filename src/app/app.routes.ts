import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserPostsComponent } from './features/user-posts/user-posts.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/post',
    component: UserPostsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
