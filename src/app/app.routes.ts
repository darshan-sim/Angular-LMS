import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserPostsComponent } from './features/user-posts/user-posts.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { PostsComponent } from './features/posts/posts.component';
import { canAccessGuard } from './core/can-access.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/post',
    component: UserPostsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user/post/view',
    component: PostsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/post/create',
    component: PostsComponent,
    canActivate: [AuthGuard],
    data: { action: 'create' },
  },
  {
    path: 'user/post/edit',
    component: PostsComponent,
    canActivate: [AuthGuard, canAccessGuard],
    data: { action: 'edit' },
  },
];
