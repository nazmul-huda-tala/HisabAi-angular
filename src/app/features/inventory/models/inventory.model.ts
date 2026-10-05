export type StockStatus = 'healthy' | 'low' | 'out';

export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  unit: string;
  currentStock: number;
  reorderLevel: number;
  /** Average cost per unit — used to value on-hand stock. */
  unitCost: number;
  /** Current selling price per unit. */
  unitPrice: number;
}

export const STOCK_STATUS_LABELS: Record<StockStatus, string> = {
  healthy: 'স্বাভাবিক',
  low: 'লো স্টক',
  out: 'স্টক নেই',
};

export type MovementType = 'purchase' | 'sale' | 'adjustment' | 'transfer' | 'return';
export type MovementDirection = 'in' | 'out';

export const MOVEMENT_TYPE_LABELS: Record<MovementType, string> = {
  purchase: 'ক্রয়',
  sale: 'বিক্রয়',
  adjustment: 'সমন্বয়',
  transfer: 'ট্রান্সফার',
  return: 'রিটার্ন',
};

/** Matches the adjustment-reason breakdown required by the stock-adjustment form. */
export type AdjustmentReason = 'damage' | 'lost' | 'expired' | 'counting-error' | 'other';

export const ADJUSTMENT_REASON_LABELS: Record<AdjustmentReason, string> = {
  damage: 'ড্যামেজ',
  lost: 'হারানো',
  expired: 'মেয়াদোত্তীর্ণ',
  'counting-error': 'গণনার ভুল',
  other: 'অন্যান্য',
};

export interface StockMovement {
  id: number;
  /** ISO date (yyyy-mm-dd) */
  date: string;
  productId: number;
  productName: string;
  sku: string;
  type: MovementType;
  direction: MovementDirection;
  quantity: number;
  /** Stock balance for this product immediately after this movement. */
  balanceAfter: number;
  reference: string;
  /** Only set for type === 'adjustment'. */
  reason?: AdjustmentReason;
  note?: string;
}
