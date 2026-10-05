export type PaymentPartyType = 'customer' | 'supplier';
export type PaymentMethod = 'cash' | 'bkash' | 'nagad' | 'bank';

export interface Payment {
  id: number;
  partyType: PaymentPartyType;
  partyId: number;
  partyName: string;
  amount: number;
  method: PaymentMethod;
  /** ISO date (yyyy-mm-dd) */
  date: string;
  note: string;
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: 'ক্যাশ',
  bkash: 'বিকাশ',
  nagad: 'নগদ',
  bank: 'ব্যাংক',
};

export const PARTY_TYPE_LABELS: Record<PaymentPartyType, string> = {
  customer: 'কাস্টমার',
  supplier: 'সরবরাহকারী',
};
