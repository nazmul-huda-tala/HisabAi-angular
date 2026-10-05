import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { ApiService, apiErrorMessage } from '../../../core/services/api.service';
import { Product } from '../models/product.model';
import { CatalogService } from './catalog.service';

/** Shape returned by GET /api/products (ProductResponse). */
export interface ProductApi {
  id: number;
  name: string;
  sku: string | null;
  barcode: string | null;
  categoryId: number | null;
  brandId: number | null;
  unit: string | null;
  costPrice: number | null;
  sellingPrice: number;
  taxRate: number | null;
  taxCategory: string | null;
  reorderLevel: number | null;
  imageUrl: string | null;
  active: boolean;
  /** Derived from inventory transactions on the server — never edited directly. */
  currentStock: number | null;
  lowStock: boolean;
}

/** Body for POST/PUT /api/products (ProductRequest). */
export interface ProductPayload {
  name: string;
  sku: string | null;
  barcode: string | null;
  categoryId: number | null;
  brandId: number | null;
  unit: string | null;
  costPrice: number;
  sellingPrice: number;
  taxRate: number;
  reorderLevel: number;
  active: boolean;
}

const DEFAULT_IMAGE_COLOR = '#f2e3c0';

/** Product store backed by the Spring Boot API. Same read API as before (`all`, `getById`) so list/details pages keep working. */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly api = inject(ApiService);
  private readonly catalog = inject(CatalogService);

  private readonly raw = signal<ProductApi[]>([]);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  /** Products mapped to the UI model; category/brand names resolve as soon as the catalog loads. */
  readonly all = computed<Product[]>(() => this.raw().map((p) => this.toProduct(p)));

  readonly activeCount = computed(() => this.all().filter((p) => p.status === 'active').length);
  readonly lowStockCount = computed(
    () => this.all().filter((p) => p.stock > 0 && p.stock <= p.reorderLevel).length,
  );
  readonly outOfStockCount = computed(() => this.all().filter((p) => p.stock <= 0).length);

  constructor() {
    inject(AuthService).loggedOut$.subscribe(() => this.raw.set([]));
  }

  /** (Re)loads the product list (and the brand/category names it needs) from the server. */
  load(): void {
    this.loading.set(true);
    this.catalog.loadAll();
    this.api.get<ProductApi[]>('/products').subscribe({
      next: (list) => {
        this.raw.set(list);
        this.error.set(null);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(apiErrorMessage(err));
        this.loading.set(false);
      },
    });
  }

  getById(id: number): Product | undefined {
    return this.all().find((p) => p.id === id);
  }

  /** Fetches one product straight from the server (used by the edit form on a fresh page load). */
  fetchOne(id: number): Observable<ProductApi> {
    return this.api.get<ProductApi>(`/products/${id}`);
  }

  create(payload: ProductPayload): Observable<Product> {
    return this.api.post<ProductApi>('/products', payload).pipe(
      tap((created) => this.raw.update((list) => [...list, created])),
      map((created) => this.toProduct(created)),
    );
  }

  update(id: number, payload: ProductPayload): Observable<Product> {
    return this.api.put<ProductApi>(`/products/${id}`, payload).pipe(
      tap((updated) => this.raw.update((list) => list.map((p) => (p.id === id ? updated : p)))),
      map((updated) => this.toProduct(updated)),
    );
  }

  remove(id: number): Observable<unknown> {
    return this.api.delete(`/products/${id}`).pipe(
      tap(() => this.raw.update((list) => list.filter((p) => p.id !== id))),
    );
  }

  private toProduct(p: ProductApi): Product {
    return {
      id: p.id,
      name: p.name,
      sku: p.sku ?? '',
      barcode: p.barcode ?? '',
      category: this.catalog.categoryName(p.categoryId),
      brand: this.catalog.brandName(p.brandId),
      unit: p.unit ?? '',
      costPrice: Number(p.costPrice ?? 0),
      salePrice: Number(p.sellingPrice ?? 0),
      stock: p.currentStock ?? 0,
      reorderLevel: p.reorderLevel ?? 0,
      taxRate: Number(p.taxRate ?? 0),
      status: p.active ? 'active' : 'inactive',
      description: '',
      imageColor: DEFAULT_IMAGE_COLOR,
      imageUrl: p.imageUrl ?? undefined,
    };
  }
}
