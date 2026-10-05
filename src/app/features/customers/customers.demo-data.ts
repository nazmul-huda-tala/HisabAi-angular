import { Customer, StatementEntry } from './models/customer.model';

/**
 * TEMPORARY static demo data for the Customer module.
 * Replace with CustomerService (backed by ApiService/HttpClient) once the
 * backend Customer endpoints are wired up. Kept internally consistent:
 * totalDue = openingBalance + sum(statement debits) - sum(statement credits),
 * and totalPurchase = sum(statement 'sale' debits) for every customer below.
 */
export const DEMO_CUSTOMERS: Customer[] = [
  {
    id: 1, name: 'রহিম স্টোর', phone: '01711-112233', address: 'নিউমার্কেট, ঢাকা',
    type: 'retail', status: 'active', creditLimit: 15000, openingBalance: 0,
    totalPurchase: 24800, totalDue: 0, lastVisitLabel: 'আজ, সকাল ১০:৪২', joinedDate: '2025-05-12',
  },
  {
    id: 2, name: 'করিম ট্রেডার্স', phone: '01922-445566', address: 'কাওরান বাজার, ঢাকা',
    type: 'wholesale', status: 'active', creditLimit: 30000, openingBalance: 0,
    totalPurchase: 890, totalDue: 890, lastVisitLabel: 'আজ, সকাল ১১:১০', joinedDate: '2026-09-13',
  },
  {
    id: 3, name: 'ওয়াক-ইন কাস্টমার', phone: '—', address: '—',
    type: 'walk-in', status: 'active', creditLimit: 0, openingBalance: 0,
    totalPurchase: 5620, totalDue: 0, lastVisitLabel: 'আজ, সকাল ১০:৪৫', joinedDate: '2025-01-01',
  },
  {
    id: 4, name: 'নিউ বাজার এন্টারপ্রাইজ', phone: '01711-667788', address: 'মালিবাগ, ঢাকা',
    type: 'wholesale', status: 'active', creditLimit: 60000, openingBalance: 8000,
    totalPurchase: 24380, totalDue: 0, lastVisitLabel: 'আজ, সকাল ১০:০২', joinedDate: '2026-02-15',
  },
  {
    id: 5, name: 'রফিকুল ইসলাম', phone: '01711-234567', address: 'মিরপুর-১০, ঢাকা',
    type: 'retail', status: 'active', creditLimit: 20000, openingBalance: 0,
    totalPurchase: 18450, totalDue: 0, lastVisitLabel: 'আজ, দুপুর ১২:৩০', joinedDate: '2025-11-02',
  },
  {
    id: 6, name: 'নুসরাত জাহান', phone: '01819-882211', address: 'ধানমন্ডি, ঢাকা',
    type: 'retail', status: 'active', creditLimit: 15000, openingBalance: 0,
    totalPurchase: 9760, totalDue: 1250, lastVisitLabel: 'গতকাল, বিকাল ৪:২০', joinedDate: '2026-01-15',
  },
  {
    id: 7, name: 'সুমন ট্রেডার্স', phone: '01922-778899', address: 'কাওরান বাজার, ঢাকা',
    type: 'wholesale', status: 'active', creditLimit: 50000, openingBalance: 5000,
    totalPurchase: 32120, totalDue: 3800, lastVisitLabel: '১০ সেপ্টেম্বর ২০২৬', joinedDate: '2025-03-10',
  },
  {
    id: 8, name: 'আফসানা বেগম', phone: '01711-998877', address: 'উত্তরা, ঢাকা',
    type: 'retail', status: 'active', creditLimit: 10000, openingBalance: 0,
    totalPurchase: 6200, totalDue: 6200, lastVisitLabel: '৮ সেপ্টেম্বর ২০২৬', joinedDate: '2026-04-05',
  },
  {
    id: 9, name: 'তানভীর আহমেদ', phone: '01611-334455', address: 'বাড্ডা, ঢাকা',
    type: 'retail', status: 'inactive', creditLimit: 5000, openingBalance: 0,
    totalPurchase: 2100, totalDue: 0, lastVisitLabel: '১৫ মে ২০২৬', joinedDate: '2025-02-01',
  },
  {
    id: 10, name: 'মিতালী এন্টারপ্রাইজ', phone: '01988-223344', address: 'গুলশান-১, ঢাকা',
    type: 'wholesale', status: 'active', creditLimit: 100000, openingBalance: 15000,
    totalPurchase: 54300, totalDue: 12500, lastVisitLabel: '১২ সেপ্টেম্বর ২০২৬', joinedDate: '2025-09-01',
  },
];

export const DEMO_STATEMENTS: Record<number, StatementEntry[]> = {
  1: [
    { date: '2025-05-20', type: 'sale', reference: 'INV-0900', description: 'পণ্য বিক্রয়', debit: 9000, credit: 0 },
    { date: '2025-05-25', type: 'payment', reference: 'PMT-0900', description: 'নগদ পেমেন্ট গ্রহণ', debit: 0, credit: 9000 },
    { date: '2026-04-14', type: 'sale', reference: 'INV-1010', description: 'পণ্য বিক্রয়', debit: 13450, credit: 0 },
    { date: '2026-04-16', type: 'payment', reference: 'PMT-1600', description: 'বিকাশ পেমেন্ট গ্রহণ', debit: 0, credit: 13450 },
    { date: '2026-09-13', type: 'sale', reference: 'INV-1048', description: 'পণ্য বিক্রয়', debit: 2350, credit: 0 },
    { date: '2026-09-13', type: 'payment', reference: 'PMT-2350', description: 'নগদ পেমেন্ট গ্রহণ', debit: 0, credit: 2350 },
  ],
  2: [
    { date: '2026-09-13', type: 'sale', reference: 'INV-1047', description: 'পণ্য বিক্রয় (বাকিতে)', debit: 890, credit: 0 },
  ],
  3: [
    { date: '2026-09-01', type: 'sale', reference: 'POS-3001', description: 'POS বিক্রয়', debit: 5200, credit: 0 },
    { date: '2026-09-01', type: 'payment', reference: 'PMT-3001', description: 'নগদ পেমেন্ট গ্রহণ', debit: 0, credit: 5200 },
    { date: '2026-09-13', type: 'sale', reference: 'INV-1046', description: 'POS বিক্রয়', debit: 420, credit: 0 },
    { date: '2026-09-13', type: 'payment', reference: 'PMT-1046', description: 'নগদ পেমেন্ট গ্রহণ', debit: 0, credit: 420 },
  ],
  4: [
    { date: '2026-03-01', type: 'sale', reference: 'INV-0700', description: 'পণ্য বিক্রয়', debit: 8000, credit: 0 },
    { date: '2026-03-10', type: 'payment', reference: 'PMT-1700', description: 'ব্যাংক ট্রান্সফার', debit: 0, credit: 16000 },
    { date: '2026-08-01', type: 'sale', reference: 'INV-1020', description: 'পণ্য বিক্রয়', debit: 13190, credit: 0 },
    { date: '2026-08-05', type: 'payment', reference: 'PMT-2100', description: 'ব্যাংক ট্রান্সফার', debit: 0, credit: 13190 },
    { date: '2026-09-13', type: 'sale', reference: 'INV-1045', description: 'পণ্য বিক্রয়', debit: 3190, credit: 0 },
    { date: '2026-09-13', type: 'payment', reference: 'PMT-2210', description: 'নগদ পেমেন্ট গ্রহণ', debit: 0, credit: 3190 },
  ],
  5: [
    { date: '2025-11-02', type: 'sale', reference: 'INV-0810', description: 'পণ্য বিক্রয়', debit: 8000, credit: 0 },
    { date: '2025-11-05', type: 'payment', reference: 'PMT-0810', description: 'নগদ পেমেন্ট গ্রহণ', debit: 0, credit: 8000 },
    { date: '2026-08-20', type: 'sale', reference: 'INV-1042', description: 'পণ্য বিক্রয়', debit: 6450, credit: 0 },
    { date: '2026-08-22', type: 'payment', reference: 'PMT-2098', description: 'বিকাশ পেমেন্ট গ্রহণ', debit: 0, credit: 6450 },
    { date: '2026-09-13', type: 'sale', reference: 'INV-1049', description: 'পণ্য বিক্রয়', debit: 4000, credit: 0 },
    { date: '2026-09-13', type: 'payment', reference: 'PMT-2350', description: 'নগদ পেমেন্ট গ্রহণ', debit: 0, credit: 4000 },
  ],
  6: [
    { date: '2026-01-20', type: 'sale', reference: 'INV-1005', description: 'পণ্য বিক্রয়', debit: 3200, credit: 0 },
    { date: '2026-01-25', type: 'payment', reference: 'PMT-2040', description: 'নগদ পেমেন্ট গ্রহণ', debit: 0, credit: 3200 },
    { date: '2026-06-10', type: 'sale', reference: 'INV-1030', description: 'পণ্য বিক্রয়', debit: 6560, credit: 0 },
    { date: '2026-09-12', type: 'payment', reference: 'PMT-2210', description: 'বিকাশ পেমেন্ট গ্রহণ', debit: 0, credit: 5310 },
  ],
  7: [
    { date: '2025-03-15', type: 'sale', reference: 'INV-0800', description: 'পণ্য বিক্রয়', debit: 10000, credit: 0 },
    { date: '2025-04-02', type: 'payment', reference: 'PMT-1500', description: 'ব্যাংক ট্রান্সফার', debit: 0, credit: 16000 },
    { date: '2026-02-10', type: 'sale', reference: 'INV-0950', description: 'পণ্য বিক্রয়', debit: 12120, credit: 0 },
    { date: '2026-05-18', type: 'payment', reference: 'PMT-1980', description: 'ব্যাংক ট্রান্সফার', debit: 0, credit: 9320 },
    { date: '2026-09-10', type: 'sale', reference: 'INV-1044', description: 'পণ্য বিক্রয়', debit: 10000, credit: 0 },
    { date: '2026-09-11', type: 'payment', reference: 'PMT-2200', description: 'ব্যাংক ট্রান্সফার', debit: 0, credit: 8000 },
  ],
  8: [
    { date: '2026-09-08', type: 'sale', reference: 'INV-1043', description: 'পণ্য বিক্রয় (বাকিতে)', debit: 6200, credit: 0 },
  ],
  9: [
    { date: '2025-02-05', type: 'sale', reference: 'INV-0620', description: 'পণ্য বিক্রয়', debit: 2100, credit: 0 },
    { date: '2025-02-10', type: 'payment', reference: 'PMT-1200', description: 'নগদ পেমেন্ট গ্রহণ', debit: 0, credit: 2100 },
  ],
  10: [
    { date: '2025-09-05', type: 'sale', reference: 'INV-0500', description: 'পণ্য বিক্রয়', debit: 20000, credit: 0 },
    { date: '2025-09-20', type: 'payment', reference: 'PMT-0900', description: 'ব্যাংক ট্রান্সফার', debit: 0, credit: 20000 },
    { date: '2026-03-12', type: 'sale', reference: 'INV-0880', description: 'পণ্য বিক্রয়', debit: 34300, credit: 0 },
    { date: '2026-03-25', type: 'payment', reference: 'PMT-1600', description: 'ব্যাংক ট্রান্সফার', debit: 0, credit: 36800 },
  ],
};
