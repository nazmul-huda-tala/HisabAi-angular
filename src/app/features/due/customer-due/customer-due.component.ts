import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { formatTaka, formatDateBn } from '../../../shared/utils/bn-format';
import { DEMO_CUSTOMERS, DEMO_STATEMENTS } from '../../customers/customers.demo-data';

interface CustomerDueRow {
  id: number;
  name: string;
  phone: string;
  reference: string;
  lastActivity: string;
  due: number;
  creditLimit: number;
  status: 'Overdue' | 'Due soon' | 'Active';
}

@Component({
  selector: 'app-customer-due',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './customer-due.component.html',
  styleUrl: './customer-due.component.scss',
})
export class CustomerDueComponent {
  readonly formatTaka = formatTaka;

  // Built from the same DEMO_CUSTOMERS/DEMO_STATEMENTS data that Customers, Details
  // and Statement pages use, so ids and amounts line up everywhere in the app.
  readonly allDues: CustomerDueRow[] = DEMO_CUSTOMERS
    .filter((c) => c.totalDue > 0)
    .map((c) => {
      const entries = DEMO_STATEMENTS[c.id] ?? [];
      const lastSale = [...entries].reverse().find((e) => e.type === 'sale');
      const lastAny = entries[entries.length - 1];
      const overdueRatio = c.creditLimit > 0 ? c.totalDue / c.creditLimit : 1;
      const status: CustomerDueRow['status'] =
        overdueRatio >= 0.7 ? 'Overdue' : overdueRatio >= 0.3 ? 'Due soon' : 'Active';

      return {
        id: c.id,
        name: c.name,
        phone: c.phone,
        reference: lastSale?.reference ?? '—',
        lastActivity: lastAny ? formatDateBn(lastAny.date) : c.lastVisitLabel,
        due: c.totalDue,
        creditLimit: c.creditLimit,
        status,
      };
    });

  searchTerm = signal('');

  readonly dues = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.allDues;
    return this.allDues.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.phone.includes(term) ||
        item.reference.toLowerCase().includes(term),
    );
  });

  readonly totalDue = computed(() => this.allDues.reduce((sum, item) => sum + item.due, 0));
  readonly overdue = computed(() =>
    this.allDues.filter((item) => item.status === 'Overdue').reduce((sum, item) => sum + item.due, 0),
  );
  readonly customersWithDue = computed(() => this.allDues.length);

  constructor(private router: Router) {}

  goToReceive(customer: CustomerDueRow): void {
    this.router.navigate(['/payments/receive'], {
      queryParams: { customerId: customer.id, name: customer.name, due: customer.due },
    });
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }
}
