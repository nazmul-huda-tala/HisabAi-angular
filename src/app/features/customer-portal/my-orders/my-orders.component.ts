import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomerPortalService } from '../services/customer-portal.service';
import { PortalOrderStatus, PORTAL_ORDER_STATUS_LABELS, orderTotal } from '../models/customer-portal.model';
import { formatTaka, formatDateBn } from '../../../shared/utils/bn-format';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  readonly statusFilter = signal<PortalOrderStatus | 'all'>('all');
  readonly statusLabels = PORTAL_ORDER_STATUS_LABELS;
  readonly statusOptions: PortalOrderStatus[] = ['placed', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'];

  readonly filteredOrders = computed(() => {
    const filter = this.statusFilter();
    const list = this.portal.myOrders();
    return filter === 'all' ? list : list.filter(o => o.status === filter);
  });

  constructor(public portal: CustomerPortalService) {}

  setFilter(status: PortalOrderStatus | 'all'): void {
    this.statusFilter.set(status);
  }

  total(orderId: number): number {
    const order = this.portal.myOrders().find(o => o.id === orderId);
    return order ? orderTotal(order) : 0;
  }

  formatTaka = formatTaka;
  formatDateBn = formatDateBn;
}
