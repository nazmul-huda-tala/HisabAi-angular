import { Injectable, computed, signal } from '@angular/core';
import { Expense, ExpenseStatus, ExpensePaymentMethod } from '../models/expense.model';
import { DEMO_EXPENSES } from '../expense.demo-data';

export type NewExpenseInput = Omit<Expense, 'id' | 'expenseNo'>;

/**
 * In-memory signal store for demo expenses. Not persisted to a backend yet —
 * swap the internal signal for an ApiService/HttpClient call once available.
 */
@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly _expenses = signal<Expense[]>([...DEMO_EXPENSES]);

  readonly expenses = computed(() => this._expenses());

  readonly totalThisMonth = computed(() => {
    const now = new Date();
    return this._expenses()
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + e.amount, 0);
  });

  readonly totalDue = computed(() =>
    this._expenses().filter((e) => e.status === 'due').reduce((sum, e) => sum + e.amount, 0),
  );

  getById(id: number): Expense | undefined {
    return this._expenses().find((e) => e.id === id);
  }

  add(input: NewExpenseInput): Expense {
    const nextId = Math.max(0, ...this._expenses().map((e) => e.id)) + 1;
    const expense: Expense = {
      ...input,
      id: nextId,
      expenseNo: `EXP-${new Date().getFullYear()}-${String(nextId).padStart(4, '0')}`,
    };
    this._expenses.update((list) => [expense, ...list]);
    return expense;
  }

  update(id: number, changes: Partial<Omit<Expense, 'id' | 'expenseNo'>>): void {
    this._expenses.update((list) => list.map((e) => (e.id === id ? { ...e, ...changes } : e)));
  }

  remove(id: number): void {
    this._expenses.update((list) => list.filter((e) => e.id !== id));
  }
}
