export type SaleStatus = 'paid' | 'due' | 'partial';
export type PaymentMethod = 'Cash' | 'bKash' | 'Nagad' | 'Card';

export interface SaleItem {
  productId: number;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Sale {
  id: number;
  invoiceNo: string;
  customerName: string;
  date: string;
  timeLabel: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  status: SaleStatus;
  paymentMethod: PaymentMethod;
}

export const SALE_STATUS_LABELS: Record<SaleStatus, string> = {
  paid: 'পরিশোধিত',
  due: 'বাকি',
  partial: 'আংশিক পরিশোধিত',
};

/* ============ Sales Return ============ */

export type SaleReturnReason =
  | 'damaged'
  | 'wrong_item'
  | 'customer_return'
  | 'quality_issue'
  | 'other';

export interface SaleReturnItem {
  productId: number;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface SaleReturn {
  id: number;
  returnNo: string;
  invoiceNo: string;
  customerName: string;
  /** ISO date (yyyy-mm-dd) */
  date: string;
  items: SaleReturnItem[];
  totalAmount: number;
  reason: SaleReturnReason;
  note: string;
}

export const SALE_RETURN_REASON_LABELS: Record<SaleReturnReason, string> = {
  damaged: 'ক্ষতিগ্রস্ত পণ্য',
  wrong_item: 'ভুল পণ্য',
  customer_return: 'ক্রেতা ফেরত দিয়েছে',
  quality_issue: 'কোয়ালিটি সমস্যা',
  other: 'অন্যান্য',
};