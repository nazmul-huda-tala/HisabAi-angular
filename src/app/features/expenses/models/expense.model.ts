export type ExpenseStatus = 'paid' | 'due';
export type ExpensePaymentMethod = 'Cash' | 'bKash' | 'Nagad' | 'Bank';

export const EXPENSE_CATEGORIES = [
  'দোকান ভাড়া', 'বিদ্যুৎ বিল', 'কর্মচারী বেতন', 'পরিবহন', 'মেরামত', 'বিজ্ঞাপন', 'অন্যান্য',
] as const;

export interface Expense {
  id: number;
  expenseNo: string;
  category: string;
  amount: number;
  /** ISO date (yyyy-mm-dd) */
  date: string;
  paymentMethod: ExpensePaymentMethod;
  status: ExpenseStatus;
  note: string;
  /** Demo-only — stores just the selected file's name, not its content. */
  attachmentName: string | null;
}

export const EXPENSE_STATUS_LABELS: Record<ExpenseStatus, string> = {
  paid: 'পরিশোধিত',
  due: 'বাকি',
};
