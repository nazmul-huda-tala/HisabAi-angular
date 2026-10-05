import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatDateBn, formatTaka } from '../../../shared/utils/bn-format';
import { STATEMENT_TYPE_LABELS, StatementEntry } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

type PeriodFilter = 'all' | 'this-month' | 'last-month';

interface RunningEntry extends StatementEntry {
  balance: number;
}

const DEMO_TODAY = new Date();

@Component({
  selector: 'app-customer-statement',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './customer-statement.component.html',
  styleUrl: './customer-statement.component.scss',
})
export class CustomerStatementComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly customerService = inject(CustomerService);
  private readonly entries = signal<StatementEntry[]>([]);

  readonly formatTaka = formatTaka;
  readonly formatDateBn = formatDateBn;
  readonly statementTypeLabels = STATEMENT_TYPE_LABELS;

  private readonly customerId = Number(this.route.snapshot.paramMap.get('id'));
  readonly customer = computed(() => this.customerService.getById(this.customerId) ?? null);

  constructor() {
    this.customerService.load();
    this.customerService.fetchDues(this.customerId).subscribe({
      next: (list) => this.entries.set(list),
      error: () => this.entries.set([]),
    });
  }

  readonly periodFilter = signal<PeriodFilter>('all');

  /** Every entry in chronological order with a running balance carried from opening balance. */
  private readonly allEntriesWithBalance = computed<RunningEntry[]>(() => {
    const c = this.customer();
    if (!c) return [];
    const sorted = [...this.entries()].sort(
      (a, b) => a.date.localeCompare(b.date),
    );
    let running = c.openingBalance;
    return sorted.map((entry) => {
      running = running + entry.debit - entry.credit;
      return { ...entry, balance: running };
    });
  });

  readonly filteredEntries = computed<RunningEntry[]>(() => {
    const period = this.periodFilter();
    const all = this.allEntriesWithBalance();
    if (period === 'all') return all;

    const refMonth = DEMO_TODAY.getMonth() - (period === 'last-month' ? 1 : 0);
    const refDate = new Date(DEMO_TODAY.getFullYear(), refMonth, 1);
    return all.filter((entry) => {
      const d = new Date(entry.date);
      return d.getFullYear() === refDate.getFullYear() && d.getMonth() === refDate.getMonth();
    });
  });

  readonly periodTotals = computed(() => {
    const entries = this.filteredEntries();
    return {
      debit: entries.reduce((sum, e) => sum + e.debit, 0),
      credit: entries.reduce((sum, e) => sum + e.credit, 0),
    };
  });

  readonly closingBalance = computed(() => {
    const all = this.allEntriesWithBalance();
    const c = this.customer();
    return all.length > 0 ? all[all.length - 1].balance : (c?.openingBalance ?? 0);
  });

  setPeriod(period: PeriodFilter): void {
    this.periodFilter.set(period);
  }
}
