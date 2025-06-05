import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CartService } from '../services/cart.service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CouponsService } from '../services/coupon.service';

@Component({
  selector: 'app-cart-dialog',
  imports: [
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    CurrencyPipe,
    MatDividerModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDialogComponent {
  constructor(
    private cartService: CartService,
    private couponsService: CouponsService,
    public dialogRef: MatDialogRef<CartDialogComponent>
  ) {}
  tabs = ['First', 'Second', 'Third'];
  readonly dialog = inject(MatDialog);
  readonly couponCodeInput = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  selectedIndex = 0;

  get cartProducts() {
    return Array.from(this.cartService.cartItemsMap()).map(([_, item]) => item);
  }

  onAddToCart(id: number) {
    const product = this.cartProducts.find(
      (product) => product.productId === id
    );
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

  get cartTotalAmount(): number {
    return this.cartService.totalAmount();
  }

  get cartDiscountedAmount(): number | null {
    return this.cartService.discountedAmount();
  }

  onCheckoutDialog() {
    this.selectedIndex = 1;
  }

  onApplyCoupon() {
    const couponCode = this.couponCodeInput.value;
    if (!couponCode) {
      this.couponCodeInput.markAllAsTouched();
      this.couponCodeInput.markAsDirty();
      return;
    }
    const discountAmount = this.couponsService.discountedPriceFromCoupon(
      this.couponCodeInput.value,
      this.cartTotalAmount
    );
    if (discountAmount === false) {
      this.couponCodeInput.setErrors({ noCouponFound: 'No Coupon Found' });
    } else {
      this.couponCodeInput.setErrors(null);
      this.cartService.setDiscounted(discountAmount, couponCode);
    }
  }
  get showCouponCodeError() {
    return this.couponCodeInput.invalid;
  }
  get couponCodeInputFormControl() {
    return this.couponCodeInput;
  }

}
