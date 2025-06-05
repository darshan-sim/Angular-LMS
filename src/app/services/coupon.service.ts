import { Injectable, signal } from '@angular/core';
import { Coupon, couponsData } from '../types/coupons';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  private _coupons = signal(couponsData);

  private get couponMap() {
    return this._coupons().reduce((a, b) => {
      a.set(b.code, b);
      return a;
    }, new Map<string, Coupon>());
  }

  discountedPriceFromCoupon(code: string, amount: number) {
    const curCoupon = this.couponMap.get(code.toUpperCase());
    if (!curCoupon) return false;
    const { value, isFlat } = curCoupon;
    return isFlat ? amount - value : amount - (value * amount) / 100;
  }
}
