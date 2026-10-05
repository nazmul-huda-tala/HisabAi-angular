import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatDateBn, formatTaka } from '../../../shared/utils/bn-format';
import { CUSTOMER_TYPE_LABELS, STATEMENT_TYPE_LABELS, StatementEntry } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

const RECENT_ENTRIES_LIMIT = 5;

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly customerService = inject(CustomerService);

  private readonly entries = signal<StatementEntry[]>([]);

  constructor() {
    this.customerService.load();
    this.customerService.fetchDues(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: (list) => this.entries.set(list),
      error: () => this.entries.set([]),
    });
  }

  readonly formatTaka = formatTaka;
  readonly formatDateBn = formatDateBn;
  readonly typeLabels = CUSTOMER_TYPE_LABELS;
  readonly statementTypeLabels = STATEMENT_TYPE_LABELS;

  private readonly customerId = signal<number>(Number(this.route.snapshot.paramMap.get('id')));

  readonly customer = computed(() =>
    this.customerService.getById(this.customerId()) ?? null,
  );

  readonly recentEntries = computed(() => {
    return [...this.entries()].reverse().slice(0, RECENT_ENTRIES_LIMIT);
  });

  readonly creditUsagePercent = computed(() => {
    const c = this.customer();
    if (!c || c.creditLimit <= 0) return 0;
    return Math.min(100, Math.round((c.totalDue / c.creditLimit) * 100));
  });
}
