import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatDateBn, formatTaka } from '../../../shared/utils/bn-format';
import {
  ONLINE_ORDER_STATUS_LABELS,
  ONLINE_ORDER_STATUS_STEPS,
  OnlineOrderStatus,
  onlineOrderSubtotal,
  onlineOrderTotal,
} from '../models/online-order.model';
import { OrderService } from '../services/order.service';

const PAYMENT_LABELS: Record<string, string> = {
  cod: 'ক্যাশ অন ডেলিভারি', bkash: 'বিকাশ', nagad: 'নগদ', card: 'কার্ড',
};

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);

  readonly formatTaka = formatTaka;
  readonly formatDateBn = formatDateBn;
  readonly statusLabels = ONLINE_ORDER_STATUS_LABELS;
  readonly statusSteps = ONLINE_ORDER_STATUS_STEPS;
  readonly paymentLabels = PAYMENT_LABELS;
  readonly subtotal = onlineOrderSubtotal;
  readonly total = onlineOrderTotal;

  private readonly orderId = signal<number>(Number(this.route.snapshot.paramMap.get('id')));

  readonly order = computed(() => this.orderService.getById(this.orderId()) ?? null);

  readonly currentStepIndex = computed(() => {
    const o = this.order();
    if (!o) return -1;
    return this.statusSteps.indexOf(o.status);
  });

  /** The next status to advance to, or null if delivered/cancelled. */
  readonly nextStatus = computed<OnlineOrderStatus | null>(() => {
    const idx = this.currentStepIndex();
    if (idx < 0 || idx >= this.statusSteps.length - 1) return null;
    return this.statusSteps[idx + 1];
  });

  advanceStatus(): void {
    const next = this.nextStatus();
    const o = this.order();
    if (next && o) this.orderService.updateStatus(o.id, next);
  }

  cancelOrder(): void {
    const o = this.order();
    if (o) this.orderService.updateStatus(o.id, 'cancelled');
  }
}
