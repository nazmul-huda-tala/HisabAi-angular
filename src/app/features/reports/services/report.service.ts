import { Injectable } from '@angular/core';

export interface SalesReportRow {
  id: number;
  invoice: string;
  date: string;
  time: string;
  customer: string;
  items: number;
  total: number;
  paid: number;
  status: 'Paid' | 'Due' | 'Partial';
  paymentMethod: string;
}

export interface PurchaseReportRow {
  id: number;
  invoice: string;
  date: string;
  supplier: string;
  items: number;
  total: number;
  paid: number;
  status: 'Paid' | 'Due' | 'Partial';
}

export interface ProfitLossRow {
  id: number;
  date: string;
  description: string;
  category: string;
  type: 'Income' | 'Expense';
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly sales: SalesReportRow[] = [
    { id: 1, invoice: 'SAL-2026-00184', date: '2026-09-14', time: '10:42 AM', customer: 'রফিকুল ইসলাম', items: 4, total: 1480, paid: 1480, status: 'Paid', paymentMethod: 'Cash' },
    { id: 2, invoice: 'SAL-2026-00183', date: '2026-09-14', time: '10:21 AM', customer: 'নুসরাত জাহান', items: 2, total: 1250, paid: 0, status: 'Due', paymentMethod: 'Due' },
    { id: 3, invoice: 'SAL-2026-00182', date: '2026-09-13', time: '06:18 PM', customer: 'রহিম স্টোর', items: 8, total: 2350, paid: 2000, status: 'Partial', paymentMethod: 'Cash' },
    { id: 4, invoice: 'SAL-2026-00181', date: '2026-09-13', time: '04:44 PM', customer: 'ওয়াক-ইন কাস্টমার', items: 3, total: 890, paid: 890, status: 'Paid', paymentMethod: 'bKash' },
    { id: 5, invoice: 'SAL-2026-00180', date: '2026-09-12', time: '02:08 PM', customer: 'নিউ বাজার এন্টারপ্রাইজ', items: 12, total: 3190, paid: 3190, status: 'Paid', paymentMethod: 'Cash' },
    { id: 6, invoice: 'SAL-2026-00179', date: '2026-09-11', time: '11:35 AM', customer: 'করিম ট্রেডার্স', items: 6, total: 1820, paid: 1200, status: 'Partial', paymentMethod: 'Bank' },
    { id: 7, invoice: 'SAL-2026-00178', date: '2026-09-10', time: '03:12 PM', customer: 'মেসার্স সজীব', items: 5, total: 2640, paid: 2640, status: 'Paid', paymentMethod: 'Cash' },
    { id: 8, invoice: 'SAL-2026-00177', date: '2026-09-09', time: '01:26 PM', customer: 'সাথী ফার্মেসি', items: 7, total: 1680, paid: 1680, status: 'Paid', paymentMethod: 'bKash' },
    { id: 9, invoice: 'SAL-2026-00176', date: '2026-09-08', time: '12:05 PM', customer: 'আলিফ কনফেকশনারি', items: 9, total: 2980, paid: 0, status: 'Due', paymentMethod: 'Due' },
  ];

  private readonly purchases: PurchaseReportRow[] = [
    { id: 1, invoice: 'PUR-2026-00028', date: '2026-09-12', supplier: 'মা এন্টারপ্রাইজ', items: 22, total: 12000, paid: 0, status: 'Due' },
    { id: 2, invoice: 'PUR-2026-00027', date: '2026-09-11', supplier: 'প্রগতি ডিস্ট্রিবিউশন', items: 16, total: 8450, paid: 8450, status: 'Paid' },
    { id: 3, invoice: 'PUR-2026-00026', date: '2026-09-09', supplier: 'ঢাকা ট্রেডার্স', items: 31, total: 18750, paid: 10000, status: 'Partial' },
    { id: 4, invoice: 'PUR-2026-00025', date: '2026-09-07', supplier: 'সানরাইজ ইমপোর্ট', items: 14, total: 9200, paid: 9200, status: 'Paid' },
    { id: 5, invoice: 'PUR-2026-00024', date: '2026-09-05', supplier: 'মেসার্স হক ব্রাদার্স', items: 28, total: 16400, paid: 0, status: 'Due' },
    { id: 6, invoice: 'PUR-2026-00023', date: '2026-09-03', supplier: 'প্রগতি ডিস্ট্রিবিউশন', items: 19, total: 11380, paid: 11380, status: 'Paid' },
    { id: 7, invoice: 'PUR-2026-00022', date: '2026-09-01', supplier: 'মা এন্টারপ্রাইজ', items: 12, total: 7680, paid: 5000, status: 'Partial' },
  ];

  private readonly profitLoss: ProfitLossRow[] = [
    { id: 1, date: '2026-09-14', description: 'Sales revenue', category: 'Sales', type: 'Income', amount: 3620 },
    { id: 2, date: '2026-09-13', description: 'Sales revenue', category: 'Sales', type: 'Income', amount: 3240 },
    { id: 3, date: '2026-09-12', description: 'Sales revenue', category: 'Sales', type: 'Income', amount: 3190 },
    { id: 4, date: '2026-09-12', description: 'Inventory purchase', category: 'Cost of goods', type: 'Expense', amount: 12000 },
    { id: 5, date: '2026-09-11', description: 'Sales revenue', category: 'Sales', type: 'Income', amount: 1820 },
    { id: 6, date: '2026-09-10', description: 'Shop rent', category: 'Operating expense', type: 'Expense', amount: 8500 },
    { id: 7, date: '2026-09-09', description: 'Sales revenue', category: 'Sales', type: 'Income', amount: 4660 },
    { id: 8, date: '2026-09-07', description: 'Inventory purchase', category: 'Cost of goods', type: 'Expense', amount: 9200 },
    { id: 9, date: '2026-09-05', description: 'Electricity bill', category: 'Operating expense', type: 'Expense', amount: 2380 },
    { id: 10, date: '2026-09-03', description: 'Sales revenue', category: 'Sales', type: 'Income', amount: 5380 },
  ];

  getSalesReport(): SalesReportRow[] {
    return [...this.sales];
  }

  getPurchaseReport(): PurchaseReportRow[] {
    return [...this.purchases];
  }

  getProfitLossReport(): ProfitLossRow[] {
    return [...this.profitLoss];
  }
}
