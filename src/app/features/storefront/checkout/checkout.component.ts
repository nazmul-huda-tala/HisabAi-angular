import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StoreHeaderComponent } from '../../../shared/components/store-header/store-header.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatTaka } from '../../../shared/utils/bn-format';
import { CartService } from '../services/cart.service';
import { OrderService } from '../../online-orders/services/order.service';

const DELIVERY_FEE = 60;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, StoreHeaderComponent, IconComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly cart = inject(CartService);
  private readonly orderService = inject(OrderService);

  readonly formatTaka = formatTaka;
  readonly deliveryFee = DELIVERY_FEE;
  readonly placedOrderNo = signal<string | null>(null);

  readonly form = this.fb.group({
    customerName: ['', Validators.required],
    customerPhone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
    shippingAddress: ['', Validators.required],
    paymentMethod: ['cod', Validators.required],
    note: [''],
  });

  get total(): number {
    return this.cart.subtotal() + this.deliveryFee;
  }

  placeOrder(): void {
    if (this.form.invalid || this.cart.lines().length === 0) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const order = this.orderService.add({
      items: this.cart.lines().map((l) => ({
        productId: l.product.id,
        name: l.product.name,
        unitPrice: l.product.salePrice,
        quantity: l.quantity,
      })),
      deliveryFee: this.deliveryFee,
      paymentMethod: value.paymentMethod as 'cod' | 'bkash' | 'nagad' | 'card',
      customerName: value.customerName!,
      customerPhone: value.customerPhone!,
      shippingAddress: value.shippingAddress!,
      note: value.note || undefined,
    });
    this.placedOrderNo.set(order.orderNo);
    this.cart.clear();
  }

  goHome(): void {
    this.router.navigateByUrl('/store');
  }
}
