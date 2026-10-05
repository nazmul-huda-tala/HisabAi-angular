import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PurchaseService } from '../services/purchase.service';
import {
  Purchase,
  PURCHASE_STATUS_LABELS,
  PurchaseStatus,
} from '../models/purchase.model';

@Component({
  selector: 'app-purchase-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss'],
})
export class PurchaseListComponent implements OnInit {
  purchases: Purchase[] = [];
  filtered: Purchase[] = [];

  searchTerm = '';
  statusFilter: 'all' | PurchaseStatus = 'all';

  statusLabels = PURCHASE_STATUS_LABELS;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.purchaseService.getAll().subscribe((data) => {
      this.purchases = data;
      this.filtered = data;
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filtered = this.purchases.filter((p) => {
      const matchSearch =
        !term ||
        p.purchaseNo.toLowerCase().includes(term) ||
        p.supplierName.toLowerCase().includes(term);
      const matchStatus =
        this.statusFilter === 'all' || p.status === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }

  // ✅ এটাই missing ছিল
  countByStatus(status: PurchaseStatus): number {
    return this.purchases.filter((p) => p.status === status).length;
  }

  toBn(value: number | string): string {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
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

  formatBnShortDate(iso: string): string {
    if (!iso) return '';
    const months = [
      'জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগ', 'সেপ্ট', 'অক্টো', 'নভে', 'ডিসে',
    ];
    const d = new Date(iso);
    return `${this.toBn(d.getDate())} ${months[d.getMonth()]}`;
  }
}