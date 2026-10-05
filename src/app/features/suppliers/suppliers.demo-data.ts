import { Supplier, SupplierLedgerEntry } from './models/supplier.model';

export const SUPPLIER_DEMO_DATA: Supplier[] = [
  {
    id: 1,
    name: 'মো: রফিকুল ইসলাম',
    companyName: 'এসিআই ট্রেডিং লিমিটেড',
    phone: '+880 1711-000000',
    address: '১২৩, মতিঝিল বা/এ, ঢাকা-১০০০',
    paymentTerms: 'due-30',
    openingBalance: 0,
    totalPayable: 85000,
    totalPurchase: 250000,
    status: 'active',
    joinedDate: '2025-01-15',
  },
  {
    id: 2,
    name: 'মো: করিম উদ্দিন',
    companyName: 'করিম এন্টারপ্রাইজ',
    phone: '+880 1811-111111',
    address: '৪৫, আগ্রাবাদ, চট্টগ্রাম',
    paymentTerms: 'due-15',
    openingBalance: 5000,
    totalPayable: 42000,
    totalPurchase: 180000,
    status: 'active',
    joinedDate: '2025-03-22',
  },
  {
    id: 3,
    name: 'আবুল হাসান',
    companyName: 'হাসান সাপ্লাইয়ার্স',
    phone: '+880 1911-222222',
    address: '২৩, জিন্দাবাজার, সিলেট',
    paymentTerms: 'cash',
    openingBalance: 0,
    totalPayable: 0,
    totalPurchase: 95000,
    status: 'active',
    joinedDate: '2025-05-10',
  },
  {
    id: 4,
    name: 'মো: জামাল হোসেন',
    companyName: 'জামাল স্টোর',
    phone: '+880 1611-333333',
    address: '৯০, খানজাহান আলী রোড, খুলনা',
    paymentTerms: 'due-7',
    openingBalance: 2000,
    totalPayable: 15000,
    totalPurchase: 62000,
    status: 'inactive',
    joinedDate: '2024-11-05',
  },
];

/** Recent purchase/payment activity per supplier id — demo-only, shown on the supplier details page. */
export const SUPPLIER_LEDGER_DEMO_DATA: Record<number, SupplierLedgerEntry[]> = {
  1: [
    { date: '2025-09-02', type: 'purchase', reference: 'PUR-1042', description: 'মাসিক পণ্য সরবরাহ', debit: 45000, credit: 0 },
    { date: '2025-09-10', type: 'payment', reference: 'PAY-3311', description: 'ব্যাংক ট্রান্সফার', debit: 0, credit: 20000 },
    { date: '2025-09-18', type: 'purchase', reference: 'PUR-1058', description: 'জরুরি স্টক সংগ্রহ', debit: 60000, credit: 0 },
  ],
  2: [
    { date: '2025-08-28', type: 'purchase', reference: 'PUR-0987', description: 'নিয়মিত সরবরাহ', debit: 30000, credit: 0 },
    { date: '2025-09-05', type: 'payment', reference: 'PAY-3298', description: 'নগদ পরিশোধ', debit: 0, credit: 12000 },
  ],
  3: [
    { date: '2025-09-12', type: 'purchase', reference: 'PUR-1061', description: 'নগদে ক্রয়', debit: 25000, credit: 25000 },
  ],
  4: [
    { date: '2025-07-20', type: 'purchase', reference: 'PUR-0871', description: 'পণ্য সরবরাহ', debit: 15000, credit: 0 },
  ],
};