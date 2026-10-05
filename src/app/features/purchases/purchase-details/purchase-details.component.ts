import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PurchaseService } from '../services/purchase.service';
import { Purchase, PURCHASE_STATUS_LABELS } from '../models/purchase.model';

@Component({
  selector: 'app-purchase-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss'],
})
export class PurchaseDetailsComponent implements OnInit {
  purchase?: Purchase;
  statusLabels = PURCHASE_STATUS_LABELS;

  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.purchaseService.getById(id).subscribe((data) => {
      this.purchase = data;
    });
  }

  formatBnDate(iso: string): string {
    if (!iso) return '';
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
    ];
    const d = new Date(iso);
    const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    const toBn = (n: number | string) =>
      n.toString().split('').map((c) => (/\d/.test(c) ? bnDigits[+c] : c)).join('');
    return `${toBn(d.getDate())} ${months[d.getMonth()]}, ${toBn(d.getFullYear())}`;
  }

  toBn(value: number | string): string {
    const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return value.toString().split('').map((c) => (/\d/.test(c) ? bnDigits[+c] : c)).join('');
  }
}