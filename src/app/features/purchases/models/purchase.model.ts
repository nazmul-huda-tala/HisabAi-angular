export type PurchaseStatus = 'paid' | 'due' | 'partial';

export interface PurchaseItem {
  productId: number;
  productName: string;
  sku: string;
  unit: string;
  quantity: number;
  unitCost: number;
  lineTotal: number;
}

export interface Purchase {
  id: number;
  purchaseNo: string;
  supplierId: number;
  supplierName: string;
  date: string;
  items: PurchaseItem[];
  subtotal: number;
  discount: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  status: PurchaseStatus;
  note: string;
}

export const PURCHASE_STATUS_LABELS: Record<PurchaseStatus, string> = {
  paid: 'পরিশোধিত',
  due: 'বাকি',
  partial: 'আংশিক পরিশোধিত',
};

/* ============ Purchase Return ============ */

export type ReturnReason =
  | 'damaged' | 'wrong_item' | 'expired' | 'quality_issue' | 'other';

export interface PurchaseReturnItem {
  productId: number;
  productName: string;
  sku: string;
  unit: string;
  quantity: number;
  unitCost: number;
  lineTotal: number;
}

export interface PurchaseReturn {
  id: number;
  returnNo: string;
  purchaseNo: string;
  supplierId: number;
  supplierName: string;
  date: string;
  items: PurchaseReturnItem[];
  totalAmount: number;
  reason: ReturnReason;
  note: string;
}

export const RETURN_REASON_LABELS: Record<ReturnReason, string> = {
  damaged: 'ক্ষতিগ্রস্ত পণ্য',
  wrong_item: 'ভুল পণ্য',
  expired: 'মেয়াদ শেষ',
  quality_issue: 'কোয়ালিটি সমস্যা',
  other: 'অন্যান্য',
};