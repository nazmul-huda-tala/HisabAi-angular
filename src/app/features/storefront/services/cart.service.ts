import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../../products/models/product.model';
import { DEMO_PRODUCTS } from '../../products/product.demo-data';

export interface CartLine {
  product: Product;
  quantity: number;
}

/**
 * In-memory cart for the public storefront (guest checkout, no login
 * required). Kept separate from the admin ProductService's own state so
 * browsing the store never mutates admin stock directly — checkout is the
 * only place stock/orders are affected, via OrderService.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly quantities = signal<Record<number, number>>({});

  readonly catalog: Product[] = DEMO_PRODUCTS.filter((p) => p.status === 'active');

  readonly lines = computed<CartLine[]>(() => {
    const qtys = this.quantities();
    return Object.entries(qtys)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = this.catalog.find((p) => p.id === Number(id));
        return product ? { product, quantity: qty } : null;
      })
      .filter((line): line is CartLine => line !== null);
  });

  readonly itemCount = computed(() => this.lines().reduce((sum, l) => sum + l.quantity, 0));
  readonly subtotal = computed(() => this.lines().reduce((sum, l) => sum + l.quantity * l.product.salePrice, 0));

  quantityOf(productId: number): number {
    return this.quantities()[productId] ?? 0;
  }

  add(productId: number, qty = 1): void {
    this.quantities.update((map) => ({ ...map, [productId]: (map[productId] ?? 0) + qty }));
  }

  setQuantity(productId: number, qty: number): void {
    this.quantities.update((map) => ({ ...map, [productId]: Math.max(0, qty) }));
  }

  remove(productId: number): void {
    this.quantities.update((map) => {
      const next = { ...map };
      delete next[productId];
      return next;
    });
  }

  clear(): void {
    this.quantities.set({});
  }
}
