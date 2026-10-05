export type UserRole =
  | 'owner'
  | 'admin'
  | 'manager'
  | 'cashier'
  | 'inventory_staff'
  | 'accountant';

export interface AppUser {
  name: string;
  email: string;
  role: UserRole;
  userId?: number;
  businessId?: number;
}

export const USER_ROLES: UserRole[] = [
  'owner',
  'admin',
  'manager',
  'cashier',
  'inventory_staff',
  'accountant',
];

export const ROLE_LABELS: Record<UserRole, string> = {
  owner: 'মালিক',
  admin: 'অ্যাডমিন',
  manager: 'ম্যানেজার',
  cashier: 'ক্যাশিয়ার',
  inventory_staff: 'ইনভেন্টরি স্টাফ',
  accountant: 'হিসাবরক্ষক',
};

/**
 * Demo login directory — until the real backend/JWT is wired, login matches
 * on email and returns the associated role. Any unrecognised email falls
 * back to 'owner' so the rest of the app remains explorable during the demo.
 */
export const DEMO_USER_DIRECTORY: Array<{ email: string; name: string; role: UserRole }> = [
  { email: 'owner@shopkhata.com', name: 'আরিফ হোসেন', role: 'owner' },
  { email: 'admin@shopkhata.com', name: 'নাফিসা রহমান', role: 'admin' },
  { email: 'manager@shopkhata.com', name: 'রাকিব হাসান', role: 'manager' },
  { email: 'cashier@shopkhata.com', name: 'সুমাইয়া খান', role: 'cashier' },
  { email: 'stock@shopkhata.com', name: 'জাহিদুল ইসলাম', role: 'inventory_staff' },
  { email: 'accounts@shopkhata.com', name: 'তানভীর আহমেদ', role: 'accountant' },
];
