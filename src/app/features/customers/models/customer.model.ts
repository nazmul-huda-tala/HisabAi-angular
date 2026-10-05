export type CustomerType = 'retail' | 'wholesale' | 'walk-in';
export type CustomerStatus = 'active' | 'inactive';

export interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  /** Stored by the backend; not shown on every screen. */
  email?: string;
  type: CustomerType;
  status: CustomerStatus;
  /** Maximum outstanding due allowed before new sales on credit are blocked. */
  creditLimit: number;
  /** Due carried over from before this customer existed in the system. */
  openingBalance: number;
  /** Lifetime total sales value (historical, snapshot-based — never recalculated from live prices). */
  totalPurchase: number;
  /** Current outstanding due (openingBalance + sales on credit − payments received). */
  totalDue: number;
  lastVisitLabel: string;
  /** ISO date (yyyy-mm-dd) the customer was first added. */
  joinedDate: string;
}

export const CUSTOMER_TYPE_LABELS: Record<CustomerType, string> = {
  retail: 'রিটেইল',
  wholesale: 'হোলসেল',
  'walk-in': 'ওয়াক-ইন',
};

export type StatementEntryType = 'sale' | 'payment' | 'return';

export interface StatementEntry {
  /** ISO date (yyyy-mm-dd) */
  date: string;
  type: StatementEntryType;
  reference: string;
  description: string;
  /** Increases the customer's due (sales on credit) */
  debit: number;
  /** Decreases the customer's due (payments received, returns) */
  credit: number;
}

export const STATEMENT_TYPE_LABELS: Record<StatementEntryType, string> = {
  sale: 'বিক্রয়',
  payment: 'পেমেন্ট',
  return: 'রিটার্ন',
};
