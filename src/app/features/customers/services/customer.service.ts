import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { ApiService, apiErrorMessage } from '../../../core/services/api.service';
import { Customer, StatementEntry } from '../models/customer.model';

/** Shape returned by GET /api/customers (CustomerResponse). */
export interface CustomerApi {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  creditLimit: number | null;
  /** Sum of unsettled dues — derived on the server. */
  outstandingDue: number | null;
}

/** Shape returned by GET /api/customers/{id}/dues (CustomerDueResponse). */
interface CustomerDueApi {
  id: number;
  customerId: number;
  saleId: number | null;
  originalAmount: number;
  dueAmount: number;
  settled: boolean;
  createdAt: string;
}

/** Body for POST/PUT /api/customers (CustomerRequest). */
export interface CustomerPayload {
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  creditLimit: number;
}

/**
 * Customer store backed by the Spring Boot API.
 *
 * The backend currently stores name, phone, email, address and credit limit, and derives the
 * outstanding due. Fields the UI also shows (type, status, opening balance, lifetime purchase,
 * last visit, joined date) have no backend column yet, so they get neutral defaults here.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly api = inject(ApiService);

  private readonly raw = signal<CustomerApi[]>([]);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly all = computed<Customer[]>(() => this.raw().map((c) => this.toCustomer(c)));

  constructor() {
    inject(AuthService).loggedOut$.subscribe(() => this.raw.set([]));
  }

  load(): void {
    this.loading.set(true);
    this.api.get<CustomerApi[]>('/customers').subscribe({
      next: (list) => {
        this.raw.set(list);
        this.error.set(null);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(apiErrorMessage(err));
        this.loading.set(false);
      },
    });
  }

  getById(id: number): Customer | undefined {
    return this.all().find((c) => c.id === id);
  }

  /** Fetches one customer from the server (used by the edit form on a fresh page load). */
  fetchOne(id: number): Observable<Customer> {
    return this.api.get<CustomerApi>(`/customers/${id}`).pipe(map((c) => this.toCustomer(c)));
  }

  /**
   * Builds a statement-lite from the customer's due records: each due is a credit sale (debit),
   * and whatever has already been paid off against it is shown as a payment (credit).
   */
  fetchDues(id: number): Observable<StatementEntry[]> {
    return this.api.get<CustomerDueApi[]>(`/customers/${id}/dues`).pipe(
      map((dues) => {
        const entries: StatementEntry[] = [];
        for (const due of dues) {
          const date = String(due.createdAt).slice(0, 10);
          const original = Number(due.originalAmount ?? 0);
          const paid = original - Number(due.dueAmount ?? 0);
          entries.push({
            date,
            type: 'sale',
            reference: due.saleId ? `বিক্রয় #${due.saleId}` : `বাকি #${due.id}`,
            description: 'বাকিতে বিক্রয়',
            debit: original,
            credit: 0,
          });
          if (paid > 0) {
            entries.push({
              date,
              type: 'payment',
              reference: `বাকি #${due.id}`,
              description: due.settled ? 'পূর্ণ পরিশোধ' : 'আংশিক পরিশোধ',
              debit: 0,
              credit: paid,
            });
          }
        }
        return entries.sort((a, b) => a.date.localeCompare(b.date));
      }),
    );
  }

  create(payload: CustomerPayload): Observable<Customer> {
    return this.api.post<CustomerApi>('/customers', payload).pipe(
      tap((created) => this.raw.update((list) => [...list, created])),
      map((created) => this.toCustomer(created)),
    );
  }

  update(id: number, payload: CustomerPayload): Observable<Customer> {
    return this.api.put<CustomerApi>(`/customers/${id}`, payload).pipe(
      tap((updated) => this.raw.update((list) => list.map((c) => (c.id === id ? updated : c)))),
      map((updated) => this.toCustomer(updated)),
    );
  }

  remove(id: number): Observable<unknown> {
    return this.api.delete(`/customers/${id}`).pipe(
      tap(() => this.raw.update((list) => list.filter((c) => c.id !== id))),
    );
  }

  private toCustomer(c: CustomerApi): Customer {
    return {
      id: c.id,
      name: c.name,
      phone: c.phone ?? '',
      address: c.address ?? '',
      email: c.email ?? undefined,
      type: 'retail',
      status: 'active',
      creditLimit: Number(c.creditLimit ?? 0),
      openingBalance: 0,
      totalPurchase: 0,
      totalDue: Number(c.outstandingDue ?? 0),
      lastVisitLabel: '—',
      joinedDate: '—',
    };
  }
}
