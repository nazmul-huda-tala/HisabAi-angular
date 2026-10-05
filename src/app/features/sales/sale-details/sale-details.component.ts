import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SALE_DEMO_DATA } from '../services/sale.demo-data';
import { Sale, SALE_STATUS_LABELS } from '../models/sale.model';

@Component({
  selector: 'app-sale-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.scss'],
})
export class SaleDetailsComponent implements OnInit {
  sale?: Sale;
  statusLabels = SALE_STATUS_LABELS;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sale = SALE_DEMO_DATA.find((s: Sale) => s.id === id);
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
    return value
      .toString()
      .split('')
      .map((c) => (/\d/.test(c) ? bnDigits[+c] : c))
      .join('');
  }
}