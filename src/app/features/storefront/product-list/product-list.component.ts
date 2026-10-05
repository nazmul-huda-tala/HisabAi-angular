import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreHeaderComponent } from '../../../shared/components/store-header/store-header.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatTaka } from '../../../shared/utils/bn-format';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, StoreHeaderComponent, IconComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  readonly cart = inject(CartService);
  readonly formatTaka = formatTaka;

  readonly searchTerm = signal('');

  readonly filtered = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.cart.catalog;
    return this.cart.catalog.filter(
      (p) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term),
    );
  });

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  addToCart(id: number): void {
    this.cart.add(id);
  }
}
