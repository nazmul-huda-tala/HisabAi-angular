import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PurchaseService } from '../services/purchase.service';
import {
  PurchaseReturn,
  ReturnReason,
  RETURN_REASON_LABELS,
} from '../models/purchase.model';

@Component({
  selector: 'app-purchase-return',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.scss'],
})
export class PurchaseReturnComponent implements OnInit {
  returns: PurchaseReturn[] = [];
  filtered: PurchaseReturn[] = [];

  searchTerm = '';
  reasonFilter: 'all' | ReturnReason = 'all';

  reasonLabels = RETURN_REASON_LABELS;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.purchaseService.getReturns().subscribe((data) => {
      this.returns = data;
      this.filtered = data;
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filtered = this.returns.filter((r) => {
      const matchSearch =
        !term ||
        r.returnNo.toLowerCase().includes(term) ||
        r.supplierName.toLowerCase().includes(term) ||
        r.purchaseNo.toLowerCase().includes(term);
      const matchReason =
        this.reasonFilter === 'all' || r.reason === this.reasonFilter;
      return matchSearch && matchReason;
    });
  }

  /** মোট রিটার্ন ভ্যালু */
  get totalReturnAmount(): number {
    return this.returns.reduce((s, r) => s + r.totalAmount, 0);
  }

  /** English number → বাংলা সংখ্যা */
  toBn(value: number | string): string {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return value
      .toString()
      .split('')
      .map((c) => (/\d/.test(c) ? bnDigits[+c] : c))
      .join('');
  }

  /** ISO date → বাংলা তারিখ */
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