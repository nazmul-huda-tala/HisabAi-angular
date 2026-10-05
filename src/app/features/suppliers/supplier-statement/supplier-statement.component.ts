import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatDateBn, formatTaka } from '../../../shared/utils/bn-format';
import { SupplierLedgerEntry } from '../models/supplier.model';
import { SUPPLIER_LEDGER_DEMO_DATA } from '../suppliers.demo-data';
import { SupplierService } from '../services/supplier.service';

type PeriodFilter = 'all' | 'this-month' | 'last-month';

interface RunningEntry extends SupplierLedgerEntry {
  balance: number;
}

/** Fixed "today" for the static demo dataset — swap for a real Date once wired to the API. */
const DEMO_TODAY = new Date('2026-09-13');

const TYPE_LABELS: Record<SupplierLedgerEntry['type'], string> = {
  purchase: 'ক্রয়',
  payment: 'পেমেন্ট',
};

@Component({
  selector: 'app-supplier-statement',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './supplier-statement.component.html',
  styleUrl: './supplier-statement.component.scss',
})
export class SupplierStatementComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly supplierService = inject(SupplierService);

  constructor() {
    this.supplierService.load();
  }

  readonly formatTaka = formatTaka;
  readonly formatDateBn = formatDateBn;
  readonly typeLabels = TYPE_LABELS;

  private readonly supplierId = Number(this.route.snapshot.paramMap.get('id'));
  readonly supplier = computed(() => this.supplierService.getById(this.supplierId) ?? null);

  readonly periodFilter = signal<PeriodFilter>('all');

  /** Every entry in chronological order with a running balance carried from opening balance. */
  private readonly allEntriesWithBalance = computed<RunningEntry[]>(() => {
    const s = this.supplier();
    if (!s) return [];
    const sorted = [...(SUPPLIER_LEDGER_DEMO_DATA[this.supplierId] ?? [])].sort((a, b) =>
      a.date.localeCompare(b.date),
    );
    let running = s.openingBalance;
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
    const s = this.supplier();
    return all.length > 0 ? all[all.length - 1].balance : (s?.openingBalance ?? 0);
  });

  setPeriod(period: PeriodFilter): void {
    this.periodFilter.set(period);
  }
}
