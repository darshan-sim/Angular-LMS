import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { NotFountComponent } from './not-fount/not-fount.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'products',
    component: ProductListingComponent,
    title: 'Products',
  },
  {
    path: '**',
    component: NotFountComponent,
    title: 'Not Found',
  },
];
