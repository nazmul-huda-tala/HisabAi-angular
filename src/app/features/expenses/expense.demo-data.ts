import { Expense } from './models/expense.model';

export const DEMO_EXPENSES: Expense[] = [
  { id: 1, expenseNo: 'EXP-2026-0091', category: 'দোকান ভাড়া', amount: 18000, date: '2026-09-01', paymentMethod: 'Bank', status: 'paid', note: 'সেপ্টেম্বর মাসের ভাড়া', attachmentName: null },
  { id: 2, expenseNo: 'EXP-2026-0092', category: 'বিদ্যুৎ বিল', amount: 3200, date: '2026-09-05', paymentMethod: 'Cash', status: 'paid', note: '', attachmentName: 'bidyut-bill-sep.jpg' },
  { id: 3, expenseNo: 'EXP-2026-0093', category: 'কর্মচারী বেতন', amount: 25000, date: '2026-09-10', paymentMethod: 'bKash', status: 'due', note: '২ জন কর্মচারীর অর্ধেক বেতন বাকি', attachmentName: null },
  { id: 4, expenseNo: 'EXP-2026-0094', category: 'পরিবহন', amount: 1500, date: '2026-09-12', paymentMethod: 'Cash', status: 'paid', note: 'মালামাল আনা-নেওয়া', attachmentName: null },
];
