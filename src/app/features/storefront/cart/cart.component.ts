import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreHeaderComponent } from '../../../shared/components/store-header/store-header.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatTaka } from '../../../shared/utils/bn-format';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, StoreHeaderComponent, IconComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  readonly cart = inject(CartService);
  readonly formatTaka = formatTaka;

  setQuantity(productId: number, event: Event): void {
    const qty = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(qty)) this.cart.setQuantity(productId, qty);
  }

  remove(productId: number): void {
    this.cart.remove(productId);
  }
}
