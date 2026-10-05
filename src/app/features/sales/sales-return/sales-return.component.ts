import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SALE_RETURN_DEMO_DATA } from '../services/sale.demo-data';
import {
  SaleReturn,
  SaleReturnReason,
  SALE_RETURN_REASON_LABELS,
} from '../models/sale.model';

@Component({
  selector: 'app-sales-return',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.scss'],
})
export class SalesReturnComponent implements OnInit {
  returns: SaleReturn[] = [];
  filtered: SaleReturn[] = [];

  searchTerm = '';
  reasonFilter: 'all' | SaleReturnReason = 'all';

  reasonLabels = SALE_RETURN_REASON_LABELS;

  ngOnInit(): void {
    this.returns = [...SALE_RETURN_DEMO_DATA];
    this.filtered = [...SALE_RETURN_DEMO_DATA];
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filtered = this.returns.filter((r) => {
      const matchSearch =
        !term ||
        r.returnNo.toLowerCase().includes(term) ||
        r.customerName.toLowerCase().includes(term) ||
        r.invoiceNo.toLowerCase().includes(term);
      const matchReason =
        this.reasonFilter === 'all' || r.reason === this.reasonFilter;
      return matchSearch && matchReason;
    });
  }

  get totalReturnAmount(): number {
    return this.returns.reduce((s, r) => s + r.totalAmount, 0);
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