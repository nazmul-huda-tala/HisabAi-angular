import { PortalProduct } from './models/customer-portal.model';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=82`;

export const PORTAL_PRODUCTS: PortalProduct[] = [
  {
    id: 1, name: 'মিনিকেট চাল ৫ কেজি', category: 'মুদি', unit: 'বস্তা',
    price: 420, oldPrice: 450, stock: 34, badge: 'জনপ্রিয়',
    imageUrl: img('photo-1586201375761-83865001e31c'),
    description: 'প্রতিদিনের রান্নার জন্য মানসম্মত মিনিকেট চাল।'
  },
  {
    id: 2, name: 'সয়াবিন তেল ২ লিটার', category: 'মুদি', unit: 'বোতল',
    price: 360, stock: 22, badge: 'নতুন',
    imageUrl: img('photo-1474979266404-7eaacbcd87c5'),
    description: 'ফর্টিফায়েড সয়াবিন তেল, ২ লিটার বোতল।'
  },
  {
    id: 3, name: 'আকিজ চিনি ১ কেজি', category: 'মুদি', unit: 'প্যাক',
    price: 125, stock: 48,
    imageUrl: img('photo-1587049352846-4a222e784d38'),
    description: 'পরিশোধিত সাদা চিনি, ১ কেজি প্যাক।'
  },
  {
    id: 4, name: 'ফার্ম ফ্রেশ ডিম ১২ পিস', category: 'দৈনন্দিন', unit: 'ডজন',
    price: 145, stock: 19,
    imageUrl: img('photo-1582722872445-44dc5f7e3c8f'),
    description: 'ফার্ম ফ্রেশ ডিম, ১২ পিসের প্যাক।'
  },
  {
    id: 5, name: 'ফ্রেশ দুধ ১ লিটার', category: 'দৈনন্দিন', unit: 'প্যাক',
    price: 95, stock: 16,
    imageUrl: img('photo-1550583724-b2692b85b150'),
    description: 'পাস্তুরিত তরল দুধ, ১ লিটার প্যাক।'
  },
  {
    id: 6, name: 'ক্রিম বিস্কুট ২০০ গ্রাম', category: 'স্ন্যাকস', unit: 'প্যাক',
    price: 55, oldPrice: 60, stock: 41, badge: 'অফার',
    imageUrl: img('photo-1558961363-fa8fdf82db35'),
    description: 'চায়ের সঙ্গে উপভোগ করার জন্য ক্রিম বিস্কুট।'
  },
  {
    id: 7, name: 'ইনস্ট্যান্ট নুডলস ৮ প্যাক', category: 'স্ন্যাকস', unit: 'বক্স',
    price: 88, stock: 27,
    imageUrl: img('photo-1612929633738-8fe44f7ec841'),
    description: 'দ্রুত রান্নার জন্য ইনস্ট্যান্ট নুডলস।'
  },
  {
    id: 8, name: 'বোতলজাত পানি ১.৫ লিটার', category: 'পানীয়', unit: 'পিস',
    price: 35, stock: 60,
    imageUrl: img('photo-1548839140-29a749e1cf4d'),
    description: 'পরিষ্কার ও নিরাপদ বোতলজাত পানি।'
  },
  {
    id: 9, name: 'ইনস্ট্যান্ট কফি ১০০ গ্রাম', category: 'পানীয়', unit: 'জার',
    price: 210, stock: 13,
    imageUrl: img('photo-1495474472287-4d71bcdd2085'),
    description: 'সকালের জন্য সুগন্ধি ইনস্ট্যান্ট কফি।'
  },
  {
    id: 10, name: 'ফেসিয়াল টিস্যু বক্স', category: 'গৃহস্থালি', unit: 'বক্স',
    price: 75, stock: 25,
    imageUrl: img('photo-1584308666744-24d5c474f2ae'),
    description: 'নরম ও দৈনন্দিন ব্যবহারের ফেসিয়াল টিস্যু।'
  },
  {
    id: 11, name: 'গোসলের সাবান ১২৫ গ্রাম', category: 'প্রসাধনী', unit: 'পিস',
    price: 42, stock: 8, badge: 'কম স্টক',
    imageUrl: img('photo-1608248597279-f99d160bfcbc'),
    description: 'দৈনন্দিন ব্যবহারের ময়েশ্চারাইজিং সাবান।'
  },
];

export const PORTAL_CATEGORIES = ['সব', 'মুদি', 'দৈনন্দিন', 'স্ন্যাকস', 'পানীয়', 'গৃহস্থালি', 'প্রসাধনী'];
