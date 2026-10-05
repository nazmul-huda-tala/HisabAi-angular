import { Injectable, computed, signal } from '@angular/core';
import {
  AdjustmentReason,
  InventoryItem,
  MovementDirection,
  StockMovement,
  StockStatus,
} from '../models/inventory.model';
import { DEMO_STOCK_ITEMS, DEMO_STOCK_MOVEMENTS } from '../inventory.demo-data';

/**
 * TEMPORARY in-memory store for the Inventory module — holds static/demo
 * data shared across stock-list, stock-adjustment and stock-movement so a
 * manual adjustment made on one page is instantly reflected on the others.
 * Replace with real HTTP calls (ApiService) once the backend Inventory
 * endpoints exist; the public method signatures below are written to make
 * that swap straightforward.
 */
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly items = signal<InventoryItem[]>(DEMO_STOCK_ITEMS);
  private readonly movements = signal<StockMovement[]>(DEMO_STOCK_MOVEMENTS);
  private nextMovementId = Math.max(0, ...DEMO_STOCK_MOVEMENTS.map((m) => m.id)) + 1;

  readonly stockItems = this.items.asReadonly();

  readonly stockMovements = computed<StockMovement[]>(() =>
    [...this.movements()].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id),
  );

  readonly totalStockValue = computed(() =>
    this.items().reduce((sum, item) => sum + item.currentStock * item.unitCost, 0),
  );

  readonly lowStockCount = computed(
    () => this.items().filter((item) => this.statusOf(item) === 'low').length,
  );

  readonly outOfStockCount = computed(
    () => this.items().filter((item) => this.statusOf(item) === 'out').length,
  );

  statusOf(item: InventoryItem): StockStatus {
    if (item.currentStock <= 0) return 'out';
    if (item.currentStock <= item.reorderLevel) return 'low';
    return 'healthy';
  }

  getItem(id: number): InventoryItem | undefined {
    return this.items().find((item) => item.id === id);
  }

  /**
   * Applies a manual stock adjustment (in or out) to a product and appends a
   * matching movement record, so it immediately shows up in the movement
   * history and updates the product's live stock everywhere it's used.
   */
  adjustStock(
    productId: number,
    direction: MovementDirection,
    quantity: number,
    reason: AdjustmentReason,
    note: string,
  ): void {
    const item = this.getItem(productId);
    if (!item || quantity <= 0) return;

    const delta = direction === 'in' ? quantity : -quantity;
    const newStock = Math.max(0, item.currentStock + delta);

    this.items.update((list) =>
      list.map((i) => (i.id === productId ? { ...i, currentStock: newStock } : i)),
    );

    const id = this.nextMovementId++;
    this.movements.update((list) => [
      ...list,
      {
        id,
        date: new Date().toISOString().slice(0, 10),
        productId,
        productName: item.name,
        sku: item.sku,
        type: 'adjustment',
        direction,
        quantity,
        balanceAfter: newStock,
        reference: `ADJ-${String(id).padStart(4, '0')}`,
        reason,
        note: note.trim() || undefined,
      },
    ]);
  }
}
