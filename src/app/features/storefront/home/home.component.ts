import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreHeaderComponent } from '../../../shared/components/store-header/store-header.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatTaka } from '../../../shared/utils/bn-format';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, StoreHeaderComponent, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly cart = inject(CartService);
  readonly formatTaka = formatTaka;
  readonly featured = this.cart.catalog.slice(0, 4);

  addToCart(id: number): void {
    this.cart.add(id);
  }
}
