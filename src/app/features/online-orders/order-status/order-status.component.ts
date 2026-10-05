import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatDateBn } from '../../../shared/utils/bn-format';
import { ONLINE_ORDER_STATUS_LABELS, ONLINE_ORDER_STATUS_STEPS } from '../models/online-order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss',
})
export class OrderStatusComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);

  readonly formatDateBn = formatDateBn;
  readonly statusLabels = ONLINE_ORDER_STATUS_LABELS;
  readonly statusSteps = ONLINE_ORDER_STATUS_STEPS;

  private readonly orderId = signal<number>(Number(this.route.snapshot.paramMap.get('id')));
  readonly order = computed(() => this.orderService.getById(this.orderId()) ?? null);

  readonly currentStepIndex = computed(() => {
    const o = this.order();
    return o ? this.statusSteps.indexOf(o.status) : -1;
  });
}
