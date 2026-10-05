import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { CartService } from '../../../features/storefront/services/cart.service';

@Component({
  selector: 'app-store-header',
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `
    <header class="store-header">
      <a class="store-header__brand" routerLink="/store"><app-icon name="box" [size]="20" /> HisabKhata স্টোর</a>
      <nav class="store-header__nav">
        <a routerLink="/store/products">সব পণ্য</a>
        <a routerLink="/store/cart" class="store-header__cart">
          <app-icon name="cart" [size]="18" />
          @if (cart.itemCount() > 0) { <span class="store-header__badge">{{ cart.itemCount() }}</span> }
        </a>
      </nav>
    </header>
  `,
  styles: [`
    .store-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.9rem 1.5rem;
      background: #fff;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      position: sticky; top: 0; z-index: 10;
    }
    .store-header__brand { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; text-decoration: none; color: inherit; }
    .store-header__nav { display: flex; align-items: center; gap: 1.25rem; }
    .store-header__nav a { text-decoration: none; color: inherit; font-weight: 500; }
    .store-header__cart { position: relative; display: flex; align-items: center; }
    .store-header__badge {
      position: absolute; top: -8px; right: -10px;
      background: var(--color-primary, #2f8f7a); color: #fff;
      border-radius: 999px; font-size: 0.65rem; padding: 0.05rem 0.4rem;
    }
  `],
})
export class StoreHeaderComponent {
  readonly cart = inject(CartService);
}
