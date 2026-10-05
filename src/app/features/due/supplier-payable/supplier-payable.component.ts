import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { formatTaka } from '../../../shared/utils/bn-format';
import { SUPPLIER_DEMO_DATA } from '../../suppliers/suppliers.demo-data';
import { PAYMENT_TERMS_LABELS } from '../../suppliers/models/supplier.model';

interface SupplierPayableRow {
  id: number;
  name: string;
  companyName: string;
  phone: string;
  paymentTerms: string;
  payable: number;
  status: 'Overdue' | 'Due soon' | 'Active';
}

@Component({
  selector: 'app-supplier-payable',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './supplier-payable.component.html',
  styleUrl: './supplier-payable.component.scss',
})
export class SupplierPayableComponent {
  readonly formatTaka = formatTaka;

  // Sourced from the same SUPPLIER_DEMO_DATA the Suppliers module uses, so ids
  // and amounts here match the real supplier list, details and statement pages.
  readonly allPayables: SupplierPayableRow[] = SUPPLIER_DEMO_DATA
    .filter((s) => s.totalPayable > 0)
    .map((s) => {
      const ratio = s.totalPurchase > 0 ? s.totalPayable / s.totalPurchase : 1;
      const status: SupplierPayableRow['status'] = ratio >= 0.4 ? 'Overdue' : ratio >= 0.15 ? 'Due soon' : 'Active';
      return {
        id: s.id,
        name: s.name,
        companyName: s.companyName,
        phone: s.phone,
        paymentTerms: PAYMENT_TERMS_LABELS[s.paymentTerms],
        payable: s.totalPayable,
        status,
      };
    });

  searchTerm = signal('');

  readonly payables = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.allPayables;
    return this.allPayables.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.companyName.toLowerCase().includes(term) ||
        item.phone.includes(term),
    );
  });

  readonly totalPayable = computed(() => this.allPayables.reduce((sum, item) => sum + item.payable, 0));
  readonly overdue = computed(() =>
    this.allPayables.filter((item) => item.status === 'Overdue').reduce((sum, item) => sum + item.payable, 0),
  );

  constructor(private router: Router) {}

  goToReceive(supplier: SupplierPayableRow): void {
    this.router.navigate(['/payments/receive'], {
      queryParams: { supplierId: supplier.id, name: supplier.companyName, due: supplier.payable },
    });
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }
}
