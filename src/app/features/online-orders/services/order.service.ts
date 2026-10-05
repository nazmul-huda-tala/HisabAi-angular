import { Injectable, computed, signal } from '@angular/core';
import { OnlineOrder, OnlineOrderStatus } from '../models/online-order.model';
import { DEMO_ONLINE_ORDERS } from '../online-orders.demo-data';

export type NewOnlineOrder = Omit<OnlineOrder, 'id' | 'orderNo' | 'placedDate' | 'status'>;

/**
 * TEMPORARY in-memory store for Online Orders — shared between the public
 * storefront (which creates orders at checkout) and the admin online-orders
 * screens (which list/track them). Same pattern as SupplierService/
 * InventoryService. Replace with real HTTP calls once the backend exists.
 */
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly orders = signal<OnlineOrder[]>(DEMO_ONLINE_ORDERS);
  private nextId = Math.max(0, ...DEMO_ONLINE_ORDERS.map((o) => o.id)) + 1;

  readonly all = this.orders.asReadonly();

  readonly pendingCount = computed(
    () => this.orders().filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length,
  );

  getById(id: number): OnlineOrder | undefined {
    return this.orders().find((o) => o.id === id);
  }

  /** Creates a new order from a storefront checkout (guest customer). */
  add(value: NewOnlineOrder): OnlineOrder {
    const id = this.nextId++;
    const order: OnlineOrder = {
      ...value,
      id,
      orderNo: `ONL-${2000 + id}`,
      placedDate: new Date().toISOString().slice(0, 10),
      status: 'placed',
    };
    this.orders.update((list) => [...list, order]);
    return order;
  }

  updateStatus(id: number, status: OnlineOrderStatus): void {
    this.orders.update((list) => list.map((o) => (o.id === id ? { ...o, status } : o)));
  }
}
