import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatCount, formatDateBn } from '../../../shared/utils/bn-format';
import {
  ADJUSTMENT_REASON_LABELS,
  MOVEMENT_TYPE_LABELS,
  MovementType,
  StockMovement,
} from '../models/inventory.model';
import { InventoryService } from '../services/inventory.service';

type TypeFilter = 'all' | MovementType;
const PAGE_SIZE = 10;

@Component({
  selector: 'app-stock-movement',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './stock-movement.component.html',
  styleUrl: './stock-movement.component.scss',
})
export class StockMovementComponent {
  private readonly inventory = inject(InventoryService);

  readonly formatCount = formatCount;
  readonly formatDateBn = formatDateBn;
  readonly typeLabels = MOVEMENT_TYPE_LABELS;
  readonly reasonLabels = ADJUSTMENT_REASON_LABELS;

  readonly searchTerm = signal('');
  readonly typeFilter = signal<TypeFilter>('all');
  readonly currentPage = signal(1);

  readonly typeFilters: { value: TypeFilter; label: string }[] = [
    { value: 'all', label: 'সব' },
    { value: 'purchase', label: this.typeLabels.purchase },
    { value: 'sale', label: this.typeLabels.sale },
    { value: 'adjustment', label: this.typeLabels.adjustment },
    { value: 'transfer', label: this.typeLabels.transfer },
    { value: 'return', label: this.typeLabels.return },
  ];

  readonly allMovements = this.inventory.stockMovements;

  readonly totalIn = computed(() =>
    this.allMovements()
      .filter((m) => m.direction === 'in')
      .reduce((sum, m) => sum + m.quantity, 0),
  );

  readonly totalOut = computed(() =>
    this.allMovements()
      .filter((m) => m.direction === 'out')
      .reduce((sum, m) => sum + m.quantity, 0),
  );

  readonly netChange = computed(() => this.totalIn() - this.totalOut());

  readonly filteredMovements = computed<StockMovement[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const type = this.typeFilter();
    return this.allMovements().filter((m) => {
      const matchesTerm =
        !term ||
        m.productName.toLowerCase().includes(term) ||
        m.sku.toLowerCase().includes(term) ||
        m.reference.toLowerCase().includes(term);
      const matchesType = type === 'all' || m.type === type;
      return matchesTerm && matchesType;
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredMovements().length / PAGE_SIZE)),
  );

  readonly pagedMovements = computed<StockMovement[]>(() => {
    const page = this.currentPage();
    const start = (page - 1) * PAGE_SIZE;
    return this.filteredMovements().slice(start, start + PAGE_SIZE);
  });

  readonly rangeLabel = computed(() => {
    const total = this.filteredMovements().length;
    if (total === 0) return `০ of ${formatCount(this.allMovements().length)}`;
    const start = (this.currentPage() - 1) * PAGE_SIZE + 1;
    const end = Math.min(start + PAGE_SIZE - 1, total);
    return `${formatCount(start)}–${formatCount(end)} of ${formatCount(total)}`;
  });

  onSearchInput(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  setTypeFilter(type: TypeFilter): void {
    this.typeFilter.set(type);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }
}
