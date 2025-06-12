import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserPostsComponent } from './features/user-posts/user-posts.component';
import { PostsComponent } from './features/posts/posts.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'user/post',
    component: UserPostsComponent,
  },
  {
    path: 'user/post/view',
    component: PostsComponent,
  },
  {
    path: 'user/post/create',
    component: PostsComponent,
    data: { action: 'create' },
  },
  {
    path: 'user/post/edit',
    component: PostsComponent,
    data: { action: 'edit' },
  },
];
