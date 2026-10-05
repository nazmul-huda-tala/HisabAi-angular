import { OnlineOrder } from './models/online-order.model';

export const DEMO_ONLINE_ORDERS: OnlineOrder[] = [
  {
    id: 1, orderNo: 'ONL-2001', placedDate: '2026-09-20', status: 'delivered',
    items: [{ productId: 1, name: 'চাল মিনিকেট ৫ কেজি', unitPrice: 420, quantity: 2 }],
    deliveryFee: 60, paymentMethod: 'cod',
    customerName: 'রহিম স্টোর', customerPhone: '01711000001', shippingAddress: 'মিরপুর-১০, ঢাকা',
  },
  {
    id: 2, orderNo: 'ONL-2002', placedDate: '2026-09-22', status: 'shipped',
    items: [
      { productId: 2, name: 'সয়াবিন তেল ২ লিটার', unitPrice: 360, quantity: 1 },
      { productId: 6, name: 'বিস্কুট ২০০ গ্রাম', unitPrice: 55, quantity: 3 },
    ],
    deliveryFee: 60, paymentMethod: 'bkash',
    customerName: 'করিম ট্রেডার্স', customerPhone: '01711000002', shippingAddress: 'ধানমন্ডি, ঢাকা',
  },
  {
    id: 3, orderNo: 'ONL-2003', placedDate: '2026-09-24', status: 'packed',
    items: [{ productId: 8, name: 'বোতলজাত পানি ১.৫L', unitPrice: 35, quantity: 6 }],
    deliveryFee: 0, paymentMethod: 'nagad',
    customerName: 'সুমন আহমেদ', customerPhone: '01911000003', shippingAddress: 'উত্তরা সেক্টর-৭, ঢাকা',
  },
  {
    id: 4, orderNo: 'ONL-2004', placedDate: '2026-09-25', status: 'confirmed',
    items: [{ productId: 9, name: 'কফি ১০০ গ্রাম', unitPrice: 210, quantity: 1 }],
    deliveryFee: 60, paymentMethod: 'card',
    customerName: 'নাজমুল হক', customerPhone: '01611000004', shippingAddress: 'বনানী, ঢাকা',
    note: 'রাতের মধ্যে ডেলিভারি দরকার',
  },
  {
    id: 5, orderNo: 'ONL-2005', placedDate: '2026-09-25', status: 'placed',
    items: [{ productId: 11, name: 'সাবান ১২৫ গ্রাম', unitPrice: 42, quantity: 5 }],
    deliveryFee: 60, paymentMethod: 'cod',
    customerName: 'তানিয়া ইসলাম', customerPhone: '01511000005', shippingAddress: 'মোহাম্মদপুর, ঢাকা',
  },
  {
    id: 6, orderNo: 'ONL-2006', placedDate: '2026-09-18', status: 'cancelled',
    items: [{ productId: 3, name: 'আকিজ চিনি ১ কেজি', unitPrice: 125, quantity: 4 }],
    deliveryFee: 60, paymentMethod: 'cod',
    customerName: 'ফরিদ মোল্লা', customerPhone: '01811000006', shippingAddress: 'যাত্রাবাড়ী, ঢাকা',
    note: 'কাস্টমার অর্ডার বাতিল করেছেন',
  },
];
