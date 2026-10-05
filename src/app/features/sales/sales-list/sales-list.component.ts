import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SALE_DEMO_DATA } from '../services/sale.demo-data';
import { Sale, SALE_STATUS_LABELS, SaleStatus } from '../models/sale.model';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
})
export class SalesListComponent implements OnInit {
  sales: Sale[] = [];
  filtered: Sale[] = [];

  searchTerm = '';
  statusFilter: 'all' | SaleStatus = 'all';

  statusLabels = SALE_STATUS_LABELS;

  ngOnInit(): void {
    this.sales = [...SALE_DEMO_DATA];
    this.filtered = [...SALE_DEMO_DATA];
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filtered = this.sales.filter((s) => {
      const matchSearch =
        !term ||
        s.invoiceNo.toLowerCase().includes(term) ||
        s.customerName.toLowerCase().includes(term);
      const matchStatus =
        this.statusFilter === 'all' || s.status === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }

  countByStatus(status: SaleStatus): number {
    return this.sales.filter((s) => s.status === status).length;
  }

  get totalSaleAmount(): number {
    return this.sales.reduce((sum, s) => sum + s.total, 0);
  }

  get totalDueAmount(): number {
    return this.sales.reduce((sum, s) => sum + s.dueAmount, 0);
  }

  toBn(value: number | string): string {
    const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return value
      .toString()
      .split('')
      .map((c) => (/\d/.test(c) ? bnDigits[+c] : c))
      .join('');
  }

  formatBnDate(iso: string): string {
    if (!iso) return '';
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
    ];
    const d = new Date(iso);
    return `${this.toBn(d.getDate())} ${months[d.getMonth()]}, ${this.toBn(d.getFullYear())}`;
  }
}