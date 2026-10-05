
export interface PortalProduct {
  id: number;
  name: string;
  category: string;
  unit: string;
  price: number;
  oldPrice?: number;
  stock: number;
  imageUrl: string;
  description: string;
  badge?: string;
}

export interface PortalCustomer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  /** Demo-only plaintext password; replace with real hashed-auth via backend later. */
  password: string;
  joinedDate: string;
}

export type PortalOrderStatus = 'placed' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';

export const PORTAL_ORDER_STATUS_LABELS: Record<PortalOrderStatus, string> = {
  placed: 'অর্ডার হয়েছে',
  confirmed: 'কনফার্ম হয়েছে',
  packed: 'প্যাক হয়েছে',
  shipped: 'পাঠানো হয়েছে',
  delivered: 'ডেলিভার হয়েছে',
  cancelled: 'বাতিল হয়েছে',
};

/** Ordered steps for the progress tracker (cancelled orders are shown separately). */
export const PORTAL_ORDER_STATUS_STEPS: PortalOrderStatus[] = ['placed', 'confirmed', 'packed', 'shipped', 'delivered'];

export interface PortalOrderItem {
  productId: number;
  name: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
}

export interface PortalOrder {
  id: number;
  orderNo: string;
  customerId: number;
  /** ISO date (yyyy-mm-dd) */
  placedDate: string;
  status: PortalOrderStatus;
  items: PortalOrderItem[];
  deliveryAddress: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  deliveryFee: number;
}

export function orderSubtotal(order: PortalOrder): number {
  return order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function orderTotal(order: PortalOrder): number {
  return orderSubtotal(order) + order.deliveryFee;
}
