import { Sale, SaleReturn } from '../models/sale.model';

export const SALE_DEMO_DATA: Sale[] = [
  {
    id: 1,
    invoiceNo: 'INV-2026-1001',
    customerName: 'আব্দুল করিম',
    date: '2026-09-20',
    timeLabel: 'সকাল ১০:৩০',
    items: [
      { productId: 101, productName: 'স্যামসাং গ্যালাক্সি এস২৪', sku: 'PRD-101',
        quantity: 1, unitPrice: 90000, lineTotal: 90000 },
      { productId: 102, productName: 'স্মার্ট ফোন কেস', sku: 'PRD-102',
        quantity: 2, unitPrice: 500, lineTotal: 1000 },
    ],
    subtotal: 91000, discount: 1000, vat: 0, total: 90000,
    paidAmount: 90000, dueAmount: 0,
    status: 'paid',
    paymentMethod: 'bKash',
  },
  {
    id: 2,
    invoiceNo: 'INV-2026-1002',
    customerName: 'রহিমা বেগম',
    date: '2026-09-21',
    timeLabel: 'দুপুর ১২:১৫',
    items: [
      { productId: 204, productName: 'স্মার্ট রাইস কুকার ২.৮L', sku: 'PRD-204',
        quantity: 2, unitPrice: 4000, lineTotal: 8000 },
      { productId: 310, productName: 'ফ্যান রেগুলেটর', sku: 'PRD-310',
        quantity: 3, unitPrice: 500, lineTotal: 1500 },
    ],
    subtotal: 9500, discount: 500, vat: 0, total: 9000,
    paidAmount: 5000, dueAmount: 4000,
    status: 'partial',
    paymentMethod: 'Cash',
  },
  {
    id: 3,
    invoiceNo: 'INV-2026-1003',
    customerName: 'মো: জামাল হোসেন',
    date: '2026-09-22',
    timeLabel: 'বিকাল ৪:৪৫',
    items: [
      { productId: 405, productName: 'সিলিং ফ্যান ৫৬ ইঞ্চি', sku: 'PRD-405',
        quantity: 3, unitPrice: 3500, lineTotal: 10500 },
    ],
    subtotal: 10500, discount: 0, vat: 0, total: 10500,
    paidAmount: 0, dueAmount: 10500,
    status: 'due',
    paymentMethod: 'Cash',
  },
];

export const SALE_RETURN_DEMO_DATA: SaleReturn[] = [
  {
    id: 1,
    returnNo: 'SR-2026-0001',
    invoiceNo: 'INV-2026-1001',
    customerName: 'আব্দুল করিম',
    date: '2026-09-21',
    items: [
      { productId: 101, productName: 'স্যামসাং গ্যালাক্সি এস২৪', sku: 'PRD-101',
        quantity: 1, unitPrice: 90000, lineTotal: 90000 },
    ],
    totalAmount: 90000,
    reason: 'damaged',
    note: 'ডিসপ্লে কাজ করছিল না, তাই ফেরত নেওয়া হলো।',
  },
  {
    id: 2,
    returnNo: 'SR-2026-0002',
    invoiceNo: 'INV-2026-1002',
    customerName: 'রহিমা বেগম',
    date: '2026-09-22',
    items: [
      { productId: 310, productName: 'ফ্যান রেগুলেটর', sku: 'PRD-310',
        quantity: 1, unitPrice: 500, lineTotal: 500 },
    ],
    totalAmount: 500,
    reason: 'wrong_item',
    note: 'ভুল মডেল দেওয়া হয়েছে।',
  },
  {
    id: 3,
    returnNo: 'SR-2026-0003',
    invoiceNo: 'INV-2026-1003',
    customerName: 'মো: জামাল হোসেন',
    date: '2026-09-23',
    items: [
      { productId: 405, productName: 'সিলিং ফ্যান ৫৬ ইঞ্চি', sku: 'PRD-405',
        quantity: 1, unitPrice: 3500, lineTotal: 3500 },
    ],
    totalAmount: 3500,
    reason: 'quality_issue',
    note: 'শব্দ বেশি হচ্ছে।',
  },
];