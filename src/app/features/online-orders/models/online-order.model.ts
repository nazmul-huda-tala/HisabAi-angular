export type OnlineOrderStatus = 'placed' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';

export const ONLINE_ORDER_STATUS_LABELS: Record<OnlineOrderStatus, string> = {
  placed: 'অর্ডার হয়েছে',
  confirmed: 'কনফার্ম হয়েছে',
  packed: 'প্যাক হয়েছে',
  shipped: 'পাঠানো হয়েছে',
  delivered: 'ডেলিভার হয়েছে',
  cancelled: 'বাতিল হয়েছে',
};

/** Ordered steps for the progress tracker; cancelled orders are shown separately. */
export const ONLINE_ORDER_STATUS_STEPS: OnlineOrderStatus[] = ['placed', 'confirmed', 'packed', 'shipped', 'delivered'];

export type OnlineOrderPaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card';

export interface OnlineOrderItem {
  productId: number;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface OnlineOrder {
  id: number;
  orderNo: string;
  /** ISO date (yyyy-mm-dd) the order was placed. */
  placedDate: string;
  status: OnlineOrderStatus;
  items: OnlineOrderItem[];
  deliveryFee: number;
  paymentMethod: OnlineOrderPaymentMethod;
  /** Guest checkout fields — the storefront has no login requirement. */
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  note?: string;
}

export function onlineOrderSubtotal(order: OnlineOrder): number {
  return order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function onlineOrderTotal(order: OnlineOrder): number {
  return onlineOrderSubtotal(order) + order.deliveryFee;
}
