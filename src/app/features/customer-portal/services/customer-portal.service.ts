import { Injectable, computed, signal } from '@angular/core';
import { PortalCustomer, PortalOrder, PortalProduct } from '../models/customer-portal.model';
import { PORTAL_PRODUCTS } from '../portal-product.data';
import { DEMO_PORTAL_CUSTOMERS, DEMO_PORTAL_ORDERS } from '../customer-portal.demo-data';

const STORAGE_KEY = 'hishabai.portal.customerId';

/**
 * Signal-based in-memory store for the customer self-service portal.
 * Static/demo data for now — swap the two array sources here for real API calls later.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomerPortalService {
  private readonly customers = signal<PortalCustomer[]>(DEMO_PORTAL_CUSTOMERS);
  private readonly allOrders = signal<PortalOrder[]>(DEMO_PORTAL_ORDERS);
  readonly products = signal<PortalProduct[]>(PORTAL_PRODUCTS);
  readonly cart = signal<Record<number, number>>(this.readCart());
  readonly cartCount = computed(() => Object.values(this.cart()).reduce((sum, qty) => sum + qty, 0));
  readonly cartTotal = computed(() => Object.entries(this.cart()).reduce((sum, [id, qty]) => {
    const product = this.products().find(p => p.id === Number(id));
    return sum + (product ? product.price * qty : 0);
  }, 0));
  private readonly currentCustomerId = signal<number | null>(this.readStoredCustomerId());

  readonly currentCustomer = computed(() => {
    const id = this.currentCustomerId();
    return id === null ? null : this.customers().find(c => c.id === id) ?? null;
  });

  readonly isLoggedIn = computed(() => this.currentCustomer() !== null);

  readonly myOrders = computed<PortalOrder[]>(() => {
    const customer = this.currentCustomer();
    if (!customer) return [];
    return this.allOrders()
      .filter(o => o.customerId === customer.id)
      .sort((a, b) => b.placedDate.localeCompare(a.placedDate));
  });

  /** Returns true on success, false on wrong phone/password. */
  login(phone: string, password: string): boolean {
    const normalizedPhone = phone.replace(/[\s-]/g, '');
    const match = this.customers().find(c => c.phone === normalizedPhone && c.password === password);
    if (!match) return false;
    this.currentCustomerId.set(match.id);
    localStorage.setItem(STORAGE_KEY, String(match.id));
    return true;
  }

  logout(): void {
    this.currentCustomerId.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  getOrder(id: number): PortalOrder | undefined {
    return this.myOrders().find(o => o.id === id);
  }


  addToCart(productId: number): void {
    const product = this.products().find(p => p.id === productId);
    if (!product || product.stock <= 0) return;
    this.cart.update(cart => ({ ...cart, [productId]: Math.min((cart[productId] ?? 0) + 1, product.stock) }));
    this.persistCart();
  }

  decreaseCart(productId: number): void {
    this.cart.update(cart => {
      const next = { ...cart };
      const qty = next[productId] ?? 0;
      if (qty <= 1) delete next[productId];
      else next[productId] = qty - 1;
      return next;
    });
    this.persistCart();
  }

  removeFromCart(productId: number): void {
    this.cart.update(cart => {
      const next = { ...cart };
      delete next[productId];
      return next;
    });
    this.persistCart();
  }

  clearCart(): void {
    this.cart.set({});
    this.persistCart();
  }

  cartItems(): Array<{ product: PortalProduct; quantity: number; total: number }> {
    return Object.entries(this.cart()).map(([id, quantity]) => {
      const product = this.products().find(p => p.id === Number(id));
      return product ? { product, quantity, total: product.price * quantity } : null;
    }).filter((item): item is { product: PortalProduct; quantity: number; total: number } => !!item);
  }

  updateProfile(patch: Partial<Pick<PortalCustomer, 'name' | 'email' | 'address' | 'phone'>>): void {
    const id = this.currentCustomerId();
    if (id === null) return;
    this.customers.update(list => list.map(c => (c.id === id ? { ...c, ...patch } : c)));
  }

  private persistCart(): void {
    localStorage.setItem('hishabai.portal.cart', JSON.stringify(this.cart()));
  }

  private readCart(): Record<number, number> {
    const raw = localStorage.getItem('hishabai.portal.cart');
    if (!raw) return {};
    try {
      return JSON.parse(raw) as Record<number, number>;
    } catch {
      return {};
    }
  }

  private readStoredCustomerId(): number | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? Number(raw) : null;
  }
}
