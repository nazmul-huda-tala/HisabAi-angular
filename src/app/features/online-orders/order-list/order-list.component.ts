import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatCount, formatDateBn, formatTaka } from '../../../shared/utils/bn-format';
import { ONLINE_ORDER_STATUS_LABELS, OnlineOrderStatus, onlineOrderTotal } from '../models/online-order.model';
import { OrderService } from '../services/order.service';

type StatusFilter = 'all' | OnlineOrderStatus;

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  readonly orderService = inject(OrderService);

  readonly formatTaka = formatTaka;
  readonly formatCount = formatCount;
  readonly formatDateBn = formatDateBn;
  readonly statusLabels = ONLINE_ORDER_STATUS_LABELS;
  readonly total = onlineOrderTotal;

  readonly statusFilter = signal<StatusFilter>('all');
  readonly searchTerm = signal('');

  /** Strongly typed so the template can call setStatus(s) / index statusLabels[s] without $any. */
  readonly statusOptions: OnlineOrderStatus[] = ['placed', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'];

  readonly pendingCount = this.orderService.pendingCount;

  readonly filtered = computed(() => {
    const status = this.statusFilter();
    const term = this.searchTerm().trim().toLowerCase();
    return this.orderService
      .all()
      .filter((o) => status === 'all' || o.status === status)
      .filter(
        (o) =>
          !term ||
          o.orderNo.toLowerCase().includes(term) ||
          o.customerName.toLowerCase().includes(term) ||
          o.customerPhone.includes(term),
      )
      .slice()
      .reverse();
  });

  setStatus(status: StatusFilter | OnlineOrderStatus): void {
    this.statusFilter.set(status);
  }

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }
}
