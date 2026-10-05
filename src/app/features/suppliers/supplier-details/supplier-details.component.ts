import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatDateBn, formatTaka } from '../../../shared/utils/bn-format';
import { PAYMENT_TERMS_LABELS } from '../models/supplier.model';
import { SUPPLIER_LEDGER_DEMO_DATA } from '../suppliers.demo-data';
import { SupplierService } from '../services/supplier.service';

const RECENT_ENTRIES_LIMIT = 5;

@Component({
  selector: 'app-supplier-details',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './supplier-details.component.html',
  styleUrl: './supplier-details.component.scss',
})
export class SupplierDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly supplierService = inject(SupplierService);

  constructor() {
    this.supplierService.load();
  }

  readonly formatTaka = formatTaka;
  readonly formatDateBn = formatDateBn;
  readonly termsLabels = PAYMENT_TERMS_LABELS;

  private readonly supplierId = signal<number>(Number(this.route.snapshot.paramMap.get('id')));

  readonly supplier = computed(() =>
    this.supplierService.all().find((s) => s.id === this.supplierId()) ?? null,
  );

  readonly recentEntries = computed(() => {
    const id = this.supplierId();
    const entries = SUPPLIER_LEDGER_DEMO_DATA[id] ?? [];
    return [...entries].reverse().slice(0, RECENT_ENTRIES_LIMIT);
  });

  readonly payableUsagePercent = computed(() => {
    const s = this.supplier();
    if (!s || s.totalPurchase <= 0) return 0;
    return Math.min(100, Math.round((s.totalPayable / s.totalPurchase) * 100));
  });
}
