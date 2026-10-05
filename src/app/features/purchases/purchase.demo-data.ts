import { Purchase } from './models/purchase.model';

export const DEMO_PURCHASES: Purchase[] = [
  {
    id: 1, purchaseNo: 'PUR-2026-1041', supplierId: 1, supplierName: 'মেসার্স জসিম ট্রেডার্স', date: '2026-09-10',
    items: [
      { productId: 1, productName: 'চাল মিনিকেট ৫ কেজি', sku: 'RICE-005', unit: 'বক্স', quantity: 20, unitCost: 360, lineTotal: 7200 },
      { productId: 3, productName: 'আকিজ চিনি ১ কেজি', sku: 'SUG-001', unit: 'কেজি', quantity: 30, unitCost: 108, lineTotal: 3240 },
    ],
    subtotal: 10440, discount: 200, total: 10240, paidAmount: 6000, dueAmount: 4240, status: 'partial', note: '',
  },
  {
    id: 2, purchaseNo: 'PUR-2026-1042', supplierId: 2, supplierName: 'ইসলাম এন্টারপ্রাইজ', date: '2026-09-12',
    items: [
      { productId: 2, productName: 'সয়াবিন তেল ২ লিটার', sku: 'OIL-002', unit: 'লিটার', quantity: 15, unitCost: 310, lineTotal: 4650 },
    ],
    subtotal: 4650, discount: 0, total: 4650, paidAmount: 4650, dueAmount: 0, status: 'paid', note: 'নগদ পরিশোধ',
  },
  {
    id: 3, purchaseNo: 'PUR-2026-1043', supplierId: 3, supplierName: 'হোসেন ফুড সাপ্লাই', date: '2026-09-13',
    items: [
      { productId: 4, productName: 'ডিম ১২ পিস', sku: 'EGG-012', unit: 'ডজন', quantity: 10, unitCost: 125, lineTotal: 1250 },
      { productId: 5, productName: 'ফ্রেশ দুধ ১ লিটার', sku: 'MILK-001', unit: 'লিটার', quantity: 12, unitCost: 80, lineTotal: 960 },
    ],
    subtotal: 2210, discount: 0, total: 2210, paidAmount: 0, dueAmount: 2210, status: 'due', note: '',
  },
];
