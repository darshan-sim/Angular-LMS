import { Injectable, signal } from '@angular/core';
import { CartItem } from '../types/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _totalAmount = signal(0);
  private _cartItemsMap = signal(new Map<number, CartItem>());

  totalAmount = this._totalAmount.asReadonly();
  cartItemsMap = this._cartItemsMap.asReadonly();

  addProductToCart(newCartItem: Omit<CartItem, 'quantity'>) {
    //update quantity get the existing one and add or default 1
    const quantity =
      (this._cartItemsMap().get(newCartItem.productId)?.quantity || 0) + 1;
    this._cartItemsMap.update((prev) => {
      console.log(prev);
      prev.set(newCartItem.productId, {
        ...newCartItem,
        quantity,
      });
      return prev;
    });
    this._totalAmount.update((prev) => (prev += newCartItem.price));
  }

  removeProductFromCart(id: number) {
    const exists = this._cartItemsMap().get(id);
    if (!exists) {
      return;
    }
    const quantity = exists.quantity - 1;

    this._cartItemsMap.update((prev) => prev.set(id, { ...exists, quantity }));

    this._totalAmount.update((prev) => (prev -= exists.price));
  }
}
