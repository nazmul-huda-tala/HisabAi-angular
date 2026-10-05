import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { ApiService, apiErrorMessage } from '../../../core/services/api.service';

/** Shape returned by GET /api/brands */
interface BrandApi {
  id: number;
  name: string;
  logoUrl: string | null;
  active: boolean;
}

/** Shape returned by GET /api/product-categories */
interface CategoryApi {
  id: number;
  name: string;
  parentCategoryId: number | null;
}

export interface BrandView {
  id: number;
  name: string;
  /** The backend has no description column yet — always empty. */
  description: string;
  active: boolean;
}

export interface CategoryView {
  id: number;
  name: string;
  /** The backend has no description column yet — always empty. */
  description: string;
  /** The backend has no active flag for categories yet — always true. */
  active: boolean;
  parentCategoryId: number | null;
}

/** Brands + product categories, loaded from the backend and shared by the product form/list and the Brand/Category pages. */
@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly api = inject(ApiService);

  private readonly brandList = signal<BrandView[]>([]);
  private readonly categoryList = signal<CategoryView[]>([]);

  readonly brands = this.brandList.asReadonly();
  readonly categories = this.categoryList.asReadonly();
  readonly error = signal<string | null>(null);

  constructor() {
    inject(AuthService).loggedOut$.subscribe(() => {
      this.brandList.set([]);
      this.categoryList.set([]);
    });
  }

  loadAll(): void {
    this.loadBrands();
    this.loadCategories();
  }

  loadBrands(): void {
    this.api.get<BrandApi[]>('/brands').subscribe({
      next: (list) => {
        this.error.set(null);
        this.brandList.set(
          list.map((b) => ({ id: b.id, name: b.name, description: '', active: b.active })),
        );
      },
      error: (err) => this.error.set(apiErrorMessage(err)),
    });
  }

  loadCategories(): void {
    this.api.get<CategoryApi[]>('/product-categories').subscribe({
      next: (list) => {
        this.error.set(null);
        this.categoryList.set(
          list.map((c) => ({
            id: c.id,
            name: c.name,
            description: '',
            active: true,
            parentCategoryId: c.parentCategoryId,
          })),
        );
      },
      error: (err) => this.error.set(apiErrorMessage(err)),
    });
  }

  brandName(id: number | null | undefined): string {
    if (id == null) return '';
    return this.brandList().find((b) => b.id === id)?.name ?? '';
  }

  categoryName(id: number | null | undefined): string {
    if (id == null) return '';
    return this.categoryList().find((c) => c.id === id)?.name ?? '';
  }

  createBrand(body: { name: string; active: boolean }): Observable<unknown> {
    return this.api.post('/brands', body).pipe(tap(() => this.loadBrands()));
  }

  updateBrand(id: number, body: { name: string; active: boolean }): Observable<unknown> {
    return this.api.put(`/brands/${id}`, body).pipe(tap(() => this.loadBrands()));
  }

  deleteBrand(id: number): Observable<unknown> {
    return this.api.delete(`/brands/${id}`).pipe(tap(() => this.loadBrands()));
  }

  createCategory(body: { name: string }): Observable<unknown> {
    return this.api.post('/product-categories', body).pipe(tap(() => this.loadCategories()));
  }

  updateCategory(id: number, body: { name: string }): Observable<unknown> {
    return this.api.put(`/product-categories/${id}`, body).pipe(tap(() => this.loadCategories()));
  }

  deleteCategory(id: number): Observable<unknown> {
    return this.api.delete(`/product-categories/${id}`).pipe(tap(() => this.loadCategories()));
  }
}
