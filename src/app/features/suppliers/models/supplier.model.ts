export type SupplierStatus = 'active' | 'inactive';
export type PaymentTerms = 'cash' | 'due-7' | 'due-15' | 'due-30';

export interface Supplier {
  id: number;
  name: string;
  companyName: string;
  phone: string;
  email?: string;
  address: string;
  note?: string;
  paymentTerms: PaymentTerms;
  /** Amount owed to this supplier from before they were added to the system. */
  openingBalance: number;
  /** Current outstanding payable (openingBalance + purchases on credit − payments made). */
  totalPayable: number;
  totalPurchase: number;
  status: SupplierStatus;
  joinedDate: string;
}

/** One row of a supplier's recent purchase/payment activity (statement-lite, shown on the details page). */
export interface SupplierLedgerEntry {
  date: string;
  type: 'purchase' | 'payment';
  reference: string;
  description: string;
  /** Increases payable (a purchase on credit). */
  debit: number;
  /** Decreases payable (a payment made to the supplier). */
  credit: number;
}

export const PAYMENT_TERMS_LABELS: Record<PaymentTerms, string> = {
  cash: 'নগদ',
  'due-7': '৭ দিন বাকি',
  'due-15': '১৫ দিন বাকি',
  'due-30': '৩০ দিন বাকি',
};
