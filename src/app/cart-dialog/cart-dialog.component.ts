import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { Product } from '../types/product';
import { CartService } from '../services/cart.service';
import { ProductStore } from '../services/product.store';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../types/cart';

@Component({
  selector: 'app-cart-dialog',
  imports: [MatDialogModule, MatCardModule, MatButtonModule, MatIcon, CurrencyPipe],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDialogComponent {

  cartProducts: CartItem[];
  constructor(private cartService: CartService, private productStore: ProductStore) {
    this.cartProducts = Array.from(cartService.cartItemsMap()).map(item => item[1]);
  }
  onAddToCart(id: number) {
    const product = this.cartProducts.find((product) => product.productId === id);
    if (!product) return;
    const { productId, price, name, image } = product;
    this.cartService.addProductToCart({ productId, price, name, image });
  }

  onRemoveFromCart(id: number) {
    this.cartService.removeProductFromCart(id);
  }

  productCountIoCart(id: number) {
    return this.cartService.cartItemsMap().get(id)?.quantity || 0;
  }
}
