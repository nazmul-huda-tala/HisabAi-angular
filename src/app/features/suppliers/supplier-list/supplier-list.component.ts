import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../services/supplier.service';
import { Supplier, SupplierStatus, PAYMENT_TERMS_LABELS } from '../models/supplier.model';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss'],
})
export class SupplierListComponent implements OnInit {
  private readonly supplierService = inject(SupplierService);

  searchTerm = '';
  statusFilter: 'all' | SupplierStatus = 'all';
  termsLabels = PAYMENT_TERMS_LABELS;

  get error(): string | null {
    return this.supplierService.error();
  }

  get suppliers(): Supplier[] {
    return this.supplierService.all();
  }

  get filtered(): Supplier[] {
    const term = this.searchTerm.toLowerCase().trim();
    return this.suppliers.filter((s) => {
      const matchSearch = !term ||
        s.name.toLowerCase().includes(term) ||
        s.companyName.toLowerCase().includes(term) ||
        s.phone.toLowerCase().includes(term);
      const matchStatus = this.statusFilter === 'all' || s.status === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }

  ngOnInit(): void {
    this.supplierService.load();
  }

  /** Filtering is computed live from searchTerm/statusFilter; kept so the template's change handlers still work. */
  applyFilter(): void {}

  countByStatus(status: SupplierStatus): number {
    return this.suppliers.filter((s) => s.status === status).length;
  }

  get totalPayable(): number {
    return this.suppliers.reduce((sum, s) => sum + s.totalPayable, 0);
  }

  toBn(value: number | string): string {
    const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return value.toString().split('').map((c) => (/\d/.test(c) ? bn[+c] : c)).join('');
  }

  formatBnDate(iso: string): string {
    if (!iso) return '';
    const months = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
    const d = new Date(iso);
    return `${this.toBn(d.getDate())} ${months[d.getMonth()]}, ${this.toBn(d.getFullYear())}`;
  }
}