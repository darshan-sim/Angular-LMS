import { Routes } from '@angular/router';
import { PostsComponent } from './features/posts/posts.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: PostsComponent,
  },
];
