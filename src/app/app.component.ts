import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from './services/cart.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatButtonModule,
    MatBadgeModule,
    ProductListingComponent,
    MatDialogModule,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  readonly dialog = inject(MatDialog);
  constructor(private cartService: CartService) {

  }
  get isProductAdded() {
    return this.cartService.cartItemsMap().size;
  }
  get totalItems() {
    let qty = 0;
    this.cartService.cartItemsMap().forEach((value) => {
      qty += value.quantity;
    });
    return qty;
  }

  openDialog() {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      panelClass: 'cart-dialog-container',
    });
  }
}
