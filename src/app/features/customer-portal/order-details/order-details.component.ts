import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerPortalService } from '../services/customer-portal.service';
import { PORTAL_ORDER_STATUS_LABELS, PORTAL_ORDER_STATUS_STEPS, orderSubtotal, orderTotal } from '../models/customer-portal.model';
import { formatTaka, formatDateBn } from '../../../shared/utils/bn-format';

const PAYMENT_LABELS: Record<string, string> = {
  cod: 'ক্যাশ অন ডেলিভারি',
  bkash: 'বিকাশ',
  nagad: 'নগদ',
  card: 'কার্ড',
};

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  readonly statusLabels = PORTAL_ORDER_STATUS_LABELS;
  readonly steps = PORTAL_ORDER_STATUS_STEPS;
  readonly paymentLabels = PAYMENT_LABELS;
  readonly formatTaka = formatTaka;
  readonly formatDateBn = formatDateBn;

  readonly order = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.portal.getOrder(id);
  });

  readonly subtotal = computed(() => {
    const order = this.order();
    return order ? orderSubtotal(order) : 0;
  });

  readonly total = computed(() => {
    const order = this.order();
    return order ? orderTotal(order) : 0;
  });

  constructor(
    private route: ActivatedRoute,
    public portal: CustomerPortalService,
  ) {}

  stepIndex(): number {
    const order = this.order();
    if (!order) return -1;
    return this.steps.indexOf(order.status as any);
  }

  isCancelled(): boolean {
    return this.order()?.status === 'cancelled';
  }
}
