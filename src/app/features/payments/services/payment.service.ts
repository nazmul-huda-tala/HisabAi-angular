import { Injectable, computed, signal } from '@angular/core';
import { Payment, PaymentMethod, PaymentPartyType } from '../models/payment.model';
import { DEMO_PAYMENTS } from '../payment.demo-data';

export interface RecordPaymentInput {
  partyType: PaymentPartyType;
  partyId: number;
  partyName: string;
  amount: number;
  method: PaymentMethod;
  note: string;
}

/**
 * In-memory signal store for demo payments. Not persisted to a backend yet —
 * swap the internal signal for an ApiService/HttpClient call once available.
 */
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly _payments = signal<Payment[]>([...DEMO_PAYMENTS]);

  readonly payments = computed(() => this._payments());

  recordPayment(input: RecordPaymentInput): Payment {
    const payment: Payment = {
      id: Math.max(0, ...this._payments().map((p) => p.id)) + 1,
      partyType: input.partyType,
      partyId: input.partyId,
      partyName: input.partyName,
      amount: input.amount,
      method: input.method,
      date: new Date().toISOString().slice(0, 10),
      note: input.note,
    };
    this._payments.update((list) => [payment, ...list]);
    return payment;
  }

  paymentsFor(partyType: PaymentPartyType, partyId: number) {
    return this._payments().filter((p) => p.partyType === partyType && p.partyId === partyId);
  }
}
