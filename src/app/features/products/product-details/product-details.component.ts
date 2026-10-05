import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatCount, formatTaka } from '../../../shared/utils/bn-format';
import { PRODUCT_STATUS_LABELS } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  constructor() {
    this.productService.load();
  }

  readonly formatTaka = formatTaka;
  readonly formatCount = formatCount;
  readonly statusLabels = PRODUCT_STATUS_LABELS;

  private readonly productId = signal<number>(Number(this.route.snapshot.paramMap.get('id')));

  readonly product = computed(() => this.productService.getById(this.productId()) ?? null);

  readonly marginPercent = computed(() => {
    const p = this.product();
    if (!p || p.costPrice <= 0) return 0;
    return Math.round(((p.salePrice - p.costPrice) / p.costPrice) * 100);
  });

  readonly stockValue = computed(() => {
    const p = this.product();
    return p ? p.stock * p.costPrice : 0;
  });

  readonly stockUsagePercent = computed(() => {
    const p = this.product();
    if (!p || p.reorderLevel <= 0) return 100;
    return Math.min(100, Math.round((p.stock / (p.reorderLevel * 3)) * 100));
  });
}
