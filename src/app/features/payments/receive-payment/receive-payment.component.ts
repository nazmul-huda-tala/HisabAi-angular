import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatTaka } from '../../../shared/utils/bn-format';
import { PaymentService } from '../services/payment.service';
import { PaymentMethod, PAYMENT_METHOD_LABELS } from '../models/payment.model';
import { DEMO_CUSTOMERS } from '../../customers/customers.demo-data';
import { SUPPLIER_DEMO_DATA } from '../../suppliers/suppliers.demo-data';

@Component({
  selector: 'app-receive-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './receive-payment.component.html',
  styleUrl: './receive-payment.component.scss',
})
export class ReceivePaymentComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly paymentService = inject(PaymentService);
  private readonly fb = inject(FormBuilder);

  readonly formatTaka = formatTaka;
  readonly methodLabels = PAYMENT_METHOD_LABELS;
  readonly methods: PaymentMethod[] = ['cash', 'bkash', 'nagad', 'bank'];

  private readonly customerId = signal<number | null>(null);
  private readonly supplierId = signal<number | null>(null);

  readonly partyType = computed<'customer' | 'supplier'>(() => (this.supplierId() ? 'supplier' : 'customer'));

  readonly party = computed(() => {
    const cId = this.customerId();
    const sId = this.supplierId();
    if (sId) {
      const s = SUPPLIER_DEMO_DATA.find((x) => x.id === sId);
      return s ? { id: s.id, name: s.companyName, due: s.totalPayable } : null;
    }
    if (cId) {
      const c = DEMO_CUSTOMERS.find((x) => x.id === cId);
      return c ? { id: c.id, name: c.name, due: c.totalDue } : null;
    }
    return null;
  });

  readonly submitted = signal(false);
  readonly lastAmount = signal(0);

  readonly form = this.fb.group({
    amount: [0, [Validators.required, Validators.min(1)]],
    method: ['cash' as PaymentMethod, Validators.required],
    note: [''],
  });

  constructor() {
    const qp = this.route.snapshot.queryParamMap;
    const cId = qp.get('customerId');
    const sId = qp.get('supplierId');
    if (sId) this.supplierId.set(Number(sId));
    if (cId) this.customerId.set(Number(cId));

    const due = qp.get('due');
    if (due) {
      this.form.patchValue({ amount: Math.max(1, Math.round(Number(due))) });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const p = this.party();
    if (!p) return;

    const { amount, method, note } = this.form.getRawValue();
    this.paymentService.recordPayment({
      partyType: this.partyType(),
      partyId: p.id,
      partyName: p.name,
      amount: amount ?? 0,
      method: (method ?? 'cash') as PaymentMethod,
      note: note ?? '',
    });

    this.lastAmount.set(amount ?? 0);
    this.submitted.set(true);
  }

  backToList(): void {
    this.router.navigate([this.partyType() === 'supplier' ? '/dues/suppliers' : '/dues/customers']);
  }
}
