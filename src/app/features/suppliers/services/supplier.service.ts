import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { ApiService, apiErrorMessage } from '../../../core/services/api.service';
import { PaymentTerms, Supplier } from '../models/supplier.model';

/** Shape returned by GET /api/suppliers (SupplierResponse). */
export interface SupplierApi {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  paymentTerms: string | null;
  /** Sum of unsettled payables — derived on the server. */
  outstandingPayable: number | null;
}

/** Body for POST/PUT /api/suppliers (SupplierRequest). */
export interface SupplierPayload {
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  paymentTerms: string | null;
}

const VALID_TERMS: PaymentTerms[] = ['cash', 'due-7', 'due-15', 'due-30'];

/**
 * Supplier store backed by the Spring Boot API.
 *
 * The backend stores one `name` (we use the company name), phone, email, address and payment
 * terms, and derives the outstanding payable. Contact person, note, status, opening balance and
 * lifetime purchase have no backend column yet, so they get neutral defaults here.
 */
@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private readonly api = inject(ApiService);

  private readonly raw = signal<SupplierApi[]>([]);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly all = computed<Supplier[]>(() => this.raw().map((s) => this.toSupplier(s)));

  readonly totalPayable = computed(() =>
    this.all().reduce((sum, s) => sum + s.totalPayable, 0),
  );

  constructor() {
    inject(AuthService).loggedOut$.subscribe(() => this.raw.set([]));
  }

  load(): void {
    this.loading.set(true);
    this.api.get<SupplierApi[]>('/suppliers').subscribe({
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

  getById(id: number): Supplier | undefined {
    return this.all().find((s) => s.id === id);
  }

  /** Fetches one supplier from the server (used by the edit form on a fresh page load). */
  fetchOne(id: number): Observable<Supplier> {
    return this.api.get<SupplierApi>(`/suppliers/${id}`).pipe(map((s) => this.toSupplier(s)));
  }

  create(payload: SupplierPayload): Observable<Supplier> {
    return this.api.post<SupplierApi>('/suppliers', payload).pipe(
      tap((created) => this.raw.update((list) => [...list, created])),
      map((created) => this.toSupplier(created)),
    );
  }

  update(id: number, payload: SupplierPayload): Observable<Supplier> {
    return this.api.put<SupplierApi>(`/suppliers/${id}`, payload).pipe(
      tap((updated) => this.raw.update((list) => list.map((s) => (s.id === id ? updated : s)))),
      map((updated) => this.toSupplier(updated)),
    );
  }

  remove(id: number): Observable<unknown> {
    return this.api.delete(`/suppliers/${id}`).pipe(
      tap(() => this.raw.update((list) => list.filter((s) => s.id !== id))),
    );
  }

  private toSupplier(s: SupplierApi): Supplier {
    const terms = (VALID_TERMS as string[]).includes(s.paymentTerms ?? '')
      ? (s.paymentTerms as PaymentTerms)
      : 'cash';
    return {
      id: s.id,
      name: s.name,
      companyName: s.name,
      phone: s.phone ?? '',
      email: s.email ?? undefined,
      address: s.address ?? '',
      note: undefined,
      paymentTerms: terms,
      openingBalance: 0,
      totalPayable: Number(s.outstandingPayable ?? 0),
      totalPurchase: 0,
      status: 'active',
      joinedDate: '—',
    };
  }
}
