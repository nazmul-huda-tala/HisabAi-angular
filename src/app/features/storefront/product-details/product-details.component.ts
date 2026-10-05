import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StoreHeaderComponent } from '../../../shared/components/store-header/store-header.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatTaka } from '../../../shared/utils/bn-format';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, StoreHeaderComponent, IconComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly cart = inject(CartService);
  readonly formatTaka = formatTaka;

  private readonly productId = signal<number>(Number(this.route.snapshot.paramMap.get('id')));
  readonly product = computed(() => this.cart.catalog.find((p) => p.id === this.productId()) ?? null);
  readonly qty = signal(1);

  incQty(): void { this.qty.update((q) => q + 1); }
  decQty(): void { this.qty.update((q) => Math.max(1, q - 1)); }

  addToCart(): void {
    const p = this.product();
    if (!p) return;
    this.cart.add(p.id, this.qty());
    this.router.navigate(['/store/cart']);
  }
}
