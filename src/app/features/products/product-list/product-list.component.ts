import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatCount, formatTaka } from '../../../shared/utils/bn-format';
import { PRODUCT_STATUS_LABELS } from '../models/product.model';
import { ProductService } from '../services/product.service';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);

  readonly error = this.productService.error;
  readonly loading = this.productService.loading;

  constructor() {
    this.productService.load();
  }

  readonly formatTaka = formatTaka;
  readonly formatCount = formatCount;
  readonly statusLabels = PRODUCT_STATUS_LABELS;

  readonly searchTerm = signal('');
  readonly page = signal(1);

  readonly totalCount = computed(() => this.productService.all().length);
  readonly lowStockCount = this.productService.lowStockCount;
  readonly outOfStockCount = this.productService.outOfStockCount;

  readonly filtered = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const list = this.productService.all();
    if (!term) return list;
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.barcode.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term),
    );
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));

  readonly pageItems = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  readonly rangeLabel = computed(() => {
    const total = this.filtered().length;
    if (total === 0) return '০';
    const start = (this.page() - 1) * PAGE_SIZE + 1;
    const end = Math.min(total, this.page() * PAGE_SIZE);
    return `${formatCount(start)}–${formatCount(end)}`;
  });

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.page.set(1);
  }

  prevPage(): void {
    this.page.update((p) => Math.max(1, p - 1));
  }

  nextPage(): void {
    this.page.update((p) => Math.min(this.totalPages(), p + 1));
  }

  stockStatus(stock: number, reorderLevel: number): 'out' | 'low' | 'ok' {
    if (stock <= 0) return 'out';
    if (stock <= reorderLevel) return 'low';
    return 'ok';
  }
}
