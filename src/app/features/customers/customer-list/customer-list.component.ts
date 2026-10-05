import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatCount, formatTaka } from '../../../shared/utils/bn-format';
import { CUSTOMER_TYPE_LABELS, Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

const PAGE_SIZE = 6;
const TODAY = new Date();

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent {
  private readonly customerService = inject(CustomerService);

  readonly formatTaka = formatTaka;
  readonly formatCount = formatCount;
  readonly typeLabels = CUSTOMER_TYPE_LABELS;

  readonly error = this.customerService.error;
  private readonly allCustomers = this.customerService.all;
  readonly searchTerm = signal('');
  readonly currentPage = signal(1);

  readonly filteredCustomers = computed<Customer[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const list = this.allCustomers();
    if (!term) return list;
    return list.filter(
      (c) => c.name.toLowerCase().includes(term) || c.phone.includes(term),
    );
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredCustomers().length / PAGE_SIZE)),
  );

  readonly pagedCustomers = computed<Customer[]>(() => {
    const page = this.currentPage();
    const start = (page - 1) * PAGE_SIZE;
    return this.filteredCustomers().slice(start, start + PAGE_SIZE);
  });

  readonly rangeLabel = computed(() => {
    const total = this.filteredCustomers().length;
    if (total === 0) return `০ of ${formatCount(0)}`;
    const start = (this.currentPage() - 1) * PAGE_SIZE + 1;
    const end = Math.min(start + PAGE_SIZE - 1, total);
    return `${formatCount(start)}–${formatCount(end)} of ${formatCount(total)}`;
  });

  // ── Summary metrics, derived from the same dataset the table renders ──
  readonly totalCustomers = computed(() => this.allCustomers().length);

  readonly newThisMonthCount = computed(
    () =>
      this.allCustomers().filter((c) => {
        const joined = new Date(c.joinedDate);
        return (
          joined.getFullYear() === TODAY.getFullYear() &&
          joined.getMonth() === TODAY.getMonth()
        );
      }).length,
  );

  readonly totalDue = computed(() =>
    this.allCustomers().reduce((sum, c) => sum + c.totalDue, 0),
  );

  readonly customersWithDueCount = computed(
    () => this.allCustomers().filter((c) => c.totalDue > 0).length,
  );

  readonly averagePurchase = computed(() => {
    const list = this.allCustomers();
    if (list.length === 0) return 0;
    return list.reduce((sum, c) => sum + c.totalPurchase, 0) / list.length;
  });

  constructor() {
    this.customerService.load();
  }

  onSearchInput(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }
}
