import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatCount, formatTaka } from '../../../shared/utils/bn-format';
import { InventoryItem, STOCK_STATUS_LABELS, StockStatus } from '../models/inventory.model';
import { InventoryService } from '../services/inventory.service';

type StatusFilter = 'all' | StockStatus;
const PAGE_SIZE = 8;

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss',
})
export class StockListComponent {
  private readonly inventory = inject(InventoryService);

  readonly formatTaka = formatTaka;
  readonly formatCount = formatCount;
  readonly statusLabels = STOCK_STATUS_LABELS;

  readonly totalStockValue = this.inventory.totalStockValue;
  readonly lowStockCount = this.inventory.lowStockCount;
  readonly outOfStockCount = this.inventory.outOfStockCount;
  readonly totalItemsCount = computed(() => this.inventory.stockItems().length);

  readonly searchTerm = signal('');
  readonly statusFilter = signal<StatusFilter>('all');
  readonly currentPage = signal(1);

  readonly statusFilters: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'সব পণ্য' },
    { value: 'low', label: 'লো স্টক' },
    { value: 'out', label: 'স্টক নেই' },
  ];

  statusOf(item: InventoryItem): StockStatus {
    return this.inventory.statusOf(item);
  }

  stockValueOf(item: InventoryItem): number {
    return item.currentStock * item.unitCost;
  }

  readonly filteredItems = computed<InventoryItem[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();
    return this.inventory.stockItems().filter((item) => {
      const matchesTerm =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || this.statusOf(item) === status;
      return matchesTerm && matchesStatus;
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredItems().length / PAGE_SIZE)),
  );

  readonly pagedItems = computed<InventoryItem[]>(() => {
    const page = this.currentPage();
    const start = (page - 1) * PAGE_SIZE;
    return this.filteredItems().slice(start, start + PAGE_SIZE);
  });

  readonly rangeLabel = computed(() => {
    const total = this.filteredItems().length;
    if (total === 0) return `০ of ${formatCount(this.totalItemsCount())}`;
    const start = (this.currentPage() - 1) * PAGE_SIZE + 1;
    const end = Math.min(start + PAGE_SIZE - 1, total);
    return `${formatCount(start)}–${formatCount(end)} of ${formatCount(total)}`;
  });

  onSearchInput(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  setStatusFilter(filter: StatusFilter): void {
    this.statusFilter.set(filter);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }
}
