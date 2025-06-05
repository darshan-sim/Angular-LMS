import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CartItem } from '../types/cart';
import { single } from 'rxjs';
import { CouponsService } from './coupon.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _totalAmount = signal(0);
  private _cartItemsMap = signal(new Map<number, CartItem>());
  private _appliedCoupon = signal<null | string>(null);
  private _discountedAmount = signal<null | number>(null);

  private couponService = inject(CouponsService);

  totalAmount = computed(() => this._totalAmount());
  cartItemsMap = computed(() => this._cartItemsMap());
  discountedAmount = computed(() => this._discountedAmount());

  addProductToCart(newCartItem: Omit<CartItem, 'quantity'>) {
    const quantity =
      (this._cartItemsMap().get(newCartItem.productId)?.quantity || 0) + 1;
    this._cartItemsMap.update((prev) =>
      prev.set(newCartItem.productId, {
        ...newCartItem,
        quantity,
      })
    );
    this._totalAmount.update((prev) => (prev += newCartItem.price));
    const couponCode = this._appliedCoupon();
    if (couponCode !== null) {
      const newCalculatedAmount = this.couponService.discountedPriceFromCoupon(
        couponCode,
        this._totalAmount()
      );
      if (newCalculatedAmount !== false) {
        this.setDiscounted(newCalculatedAmount, couponCode);
      }
    }
  }

  removeProductFromCart(id: number) {
    const exists = this._cartItemsMap().get(id);
    if (!exists) {
      return;
    }
    const quantity = exists.quantity - 1;
    if (quantity === 0) {
      this._cartItemsMap.update((prev) => {
        this._totalAmount.update((prev) => (prev -= exists.price));
        prev.delete(id);
        return prev;
      });
      if (this._cartItemsMap().size === 0) {
        this._appliedCoupon.update((_) => null);
        this._discountedAmount.update((_) => null);
        return;
      }
      return;
    }

    this._cartItemsMap.update((prev) => prev.set(id, { ...exists, quantity }));
    this._totalAmount.update((prev) => (prev -= exists.price));
    const couponCode = this._appliedCoupon();

    if (couponCode !== null) {
      const newCalculatedAmount = this.couponService.discountedPriceFromCoupon(
        couponCode,
        this._totalAmount()
      );
      if (newCalculatedAmount !== false) {
        this.setDiscounted(newCalculatedAmount, couponCode);
      }
    }
  }

  setDiscounted(discountedAmount: number, couponCode: string) {
    this._appliedCoupon.set(couponCode);
    const nonNegativeDiscount = discountedAmount < 0 ? 0 : discountedAmount;
    this._discountedAmount.set(nonNegativeDiscount);
  }
}
