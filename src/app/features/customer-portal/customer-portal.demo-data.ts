import { PortalCustomer, PortalOrder } from './models/customer-portal.model';
import { DEMO_PRODUCTS } from '../products/product.demo-data';
import { PORTAL_PRODUCTS } from './portal-product.data';

// Reuses the same person as customer #1 in the admin Customers module (রহিম স্টোর)
// and #2 (করিম ট্রেডার্স) so portal orders line up with real admin-side customer records.
export const DEMO_PORTAL_CUSTOMERS: PortalCustomer[] = [
  { id: 1, name: 'রহিম স্টোর', phone: '01711112233', email: 'rahim@shopkhata.com', address: 'নিউমার্কেট, ঢাকা', password: 'demo1234', joinedDate: '2025-11-02' },
  { id: 2, name: 'করিম ট্রেডার্স', phone: '01922445566', email: 'karim@shopkhata.com', address: 'কাওরান বাজার, ঢাকা', password: 'demo1234', joinedDate: '2026-01-15' },
];

const p = (id: number) => DEMO_PRODUCTS.find(pr => pr.id === id)!;
const portalImage = (id: number) => PORTAL_PRODUCTS.find(pr => pr.id === id)?.imageUrl ?? p(id).imageUrl!;

export const DEMO_PORTAL_ORDERS: PortalOrder[] = [
  {
    id: 101, orderNo: 'ORD-1001', customerId: 1, placedDate: '2026-09-20', status: 'delivered',
    items: [
      { productId: 1, name: p(1).name, imageUrl: portalImage(1), quantity: 2, unitPrice: p(1).salePrice },
      { productId: 3, name: p(3).name, imageUrl: portalImage(3), quantity: 3, unitPrice: p(3).salePrice },
    ],
    deliveryAddress: 'নিউমার্কেট, ঢাকা', paymentMethod: 'cod', deliveryFee: 40,
  },
  {
    id: 102, orderNo: 'ORD-1014', customerId: 1, placedDate: '2026-09-22', status: 'shipped',
    items: [
      { productId: 5, name: p(5).name, imageUrl: portalImage(5), quantity: 4, unitPrice: p(5).salePrice },
      { productId: 4, name: p(4).name, imageUrl: portalImage(4), quantity: 1, unitPrice: p(4).salePrice },
    ],
    deliveryAddress: 'নিউমার্কেট, ঢাকা', paymentMethod: 'bkash', deliveryFee: 40,
  },
  {
    id: 103, orderNo: 'ORD-1022', customerId: 1, placedDate: '2026-09-23', status: 'confirmed',
    items: [
      { productId: 8, name: p(8).name, imageUrl: portalImage(8), quantity: 6, unitPrice: p(8).salePrice },
    ],
    deliveryAddress: 'নিউমার্কেট, ঢাকা', paymentMethod: 'cod', deliveryFee: 40,
  },
  {
    id: 104, orderNo: 'ORD-1008', customerId: 2, placedDate: '2026-09-18', status: 'cancelled',
    items: [
      { productId: 12, name: p(12).name, imageUrl: portalImage(12), quantity: 2, unitPrice: p(12).salePrice },
    ],
    deliveryAddress: 'কাওরান বাজার, ঢাকা', paymentMethod: 'nagad', deliveryFee: 40,
  },
  {
    id: 105, orderNo: 'ORD-1030', customerId: 2, placedDate: '2026-09-24', status: 'placed',
    items: [
      { productId: 6, name: p(6).name, imageUrl: portalImage(6), quantity: 5, unitPrice: p(6).salePrice },
      { productId: 9, name: p(9).name, imageUrl: portalImage(9), quantity: 2, unitPrice: p(9).salePrice },
      { productId: 11, name: p(11).name, imageUrl: portalImage(11), quantity: 3, unitPrice: p(11).salePrice },
    ],
    deliveryAddress: 'কাওরান বাজার, ঢাকা', paymentMethod: 'card', deliveryFee: 60,
  },
];
