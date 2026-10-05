import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Purchase, PurchaseReturn } from '../models/purchase.model';

@Injectable({ providedIn: 'root' })
export class PurchaseService {

  private purchases: Purchase[] = [
    {
      id: 1,
      purchaseNo: 'PUR-2026-0892',
      supplierId: 101,
      supplierName: 'এসিআই ট্রেডিং লিমিটেড',
      date: '2026-09-15',
      items: [
        { productId: 101, productName: 'স্যামসাং গ্যালাক্সি এস২৪', sku: 'PRD-101',
          unit: 'টি', quantity: 2, unitCost: 85000, lineTotal: 170000 },
        { productId: 204, productName: 'স্মার্ট রাইস কুকার ২.৮L', sku: 'PRD-204',
          unit: 'টি', quantity: 5, unitCost: 3500, lineTotal: 17500 },
      ],
      subtotal: 187500, discount: 0, total: 187500,
      paidAmount: 150000, dueAmount: 37500,
      status: 'partial',
      note: 'পণ্যগুলো আগামী ৩ দিনের মধ্যে ডেলিভারি সম্পন্ন করার জন্য অনুরোধ করা হলো।',
    },
  ];

  private returns: PurchaseReturn[] = [
    {
      id: 1,
      returnNo: 'PR-2026-0001',
      purchaseNo: 'PUR-2026-0892',
      supplierId: 101,
      supplierName: 'এসিআই ট্রেডিং লিমিটেড',
      date: '2026-09-16',
      items: [
        { productId: 101, productName: 'স্যামসাং গ্যালাক্সি এস২৪', sku: 'PRD-101',
          unit: 'টি', quantity: 1, unitCost: 85000, lineTotal: 85000 },
      ],
      totalAmount: 85000,
      reason: 'damaged',
      note: 'ডিসপ্লে ভাঙা অবস্থায় পাওয়া গেছে।',
    },
  ];

  getAll(): Observable<Purchase[]> {
    return of(this.purchases);
  }

  getById(id: number): Observable<Purchase | undefined> {
    return of(this.purchases.find((p) => p.id === id));
  }

  getReturns(): Observable<PurchaseReturn[]> {
    return of(this.returns);
  }

  getReturnById(id: number): Observable<PurchaseReturn | undefined> {
    return of(this.returns.find((r) => r.id === id));
  }

  addReturn(payload: Omit<PurchaseReturn, 'id'>): PurchaseReturn {
    const newId = this.returns.length
      ? Math.max(...this.returns.map((r) => r.id)) + 1
      : 1;
    const newReturn: PurchaseReturn = { id: newId, ...payload };
    this.returns.push(newReturn);
    return newReturn;
  }
}