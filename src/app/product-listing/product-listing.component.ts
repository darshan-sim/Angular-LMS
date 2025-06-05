import { Component, effect } from '@angular/core';
import { Product, productsData } from '../types/product';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CartService } from '../services/cart.service';
import { MatBadgeModule } from '@angular/material/badge';
import { CurrencyPipe } from '@angular/common';
import { ProductStore } from '../services/product.store';

@Component({
  selector: 'app-product-listing',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatGridListModule, MatBadgeModule, CurrencyPipe],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss',
})
export class ProductListingComponent {
  products: Product[];
  constructor(private cartService: CartService, private productStore: ProductStore) {
    this.products = productStore.products()
  }

  onAddToCart(id: number) {
    const product = this.products.find((product) => product.productId === id);
    if (!product) return;
    const { productId, price, name, image } = product;
    this.cartService.addProductToCart({ productId, price, name, image });
  }

  onRemoveFromCart(id: number) {
    this.cartService.removeProductFromCart(id);
  }

  productCountIoCart(id: number){
    return this.cartService.cartItemsMap().get(id)?.quantity || 0
  }
}
