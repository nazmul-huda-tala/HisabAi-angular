import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { formatTaka, formatDateBn } from '../../../shared/utils/bn-format';
import { PaymentService } from '../services/payment.service';
import { PARTY_TYPE_LABELS, PAYMENT_METHOD_LABELS } from '../models/payment.model';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss',
})
export class PaymentListComponent {
  private readonly paymentService = inject(PaymentService);

  readonly formatTaka = formatTaka;
  readonly formatDateBn = formatDateBn;
  readonly partyTypeLabels = PARTY_TYPE_LABELS;
  readonly methodLabels = PAYMENT_METHOD_LABELS;

  searchTerm = signal('');

  readonly payments = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const all = this.paymentService.payments();
    if (!term) return all;
    return all.filter((p) => p.partyName.toLowerCase().includes(term));
  });

  readonly totalReceived = computed(() =>
    this.paymentService.payments().reduce((sum, p) => sum + p.amount, 0),
  );

  clearSearch(): void {
    this.searchTerm.set('');
  }
}
