import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatDateBn, formatTaka } from '../../../shared/utils/bn-format';
import { PurchaseReportRow, ReportService } from '../services/report.service';

@Component({
  selector: 'app-purchase-report',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './purchase-report.component.html',
  styleUrl: './purchase-report.component.scss',
})
export class PurchaseReportComponent {
  private readonly reportService = inject(ReportService);

  readonly allRows = this.reportService.getPurchaseReport();
  searchTerm = '';
  statusFilter = 'All';
  fromDate = '2026-09-01';
  toDate = '2026-09-14';
  notice = '';

  get rows(): PurchaseReportRow[] {
    const search = this.searchTerm.trim().toLowerCase();
    return this.allRows.filter((row) => {
      const matchesSearch = !search || `${row.invoice} ${row.supplier}`.toLowerCase().includes(search);
      const matchesStatus = this.statusFilter === 'All' || row.status === this.statusFilter;
      return matchesSearch && matchesStatus && row.date >= this.fromDate && row.date <= this.toDate;
    });
  }

  get totalPurchase(): number { return this.rows.reduce((sum, row) => sum + row.total, 0); }
  get totalPaid(): number { return this.rows.reduce((sum, row) => sum + row.paid, 0); }
  get totalPayable(): number { return this.totalPurchase - this.totalPaid; }
  get averagePurchase(): number { return this.rows.length ? Math.round(this.totalPurchase / this.rows.length) : 0; }
  get maxMonthlyPurchase(): number { return Math.max(...this.monthlyPurchases.map((item) => item.value), 1); }

  readonly monthlyPurchases = [
    { label: 'এপ্রিল', value: 62800 },
    { label: 'মে', value: 75400 },
    { label: 'জুন', value: 68200 },
    { label: 'জুলাই', value: 89700 },
    { label: 'আগস্ট', value: 86500 },
    { label: 'সেপ্টে.', value: 73860 },
  ];

  formatMoney = formatTaka;
  formatDate = formatDateBn;

  resetFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'All';
    this.fromDate = '2026-09-01';
    this.toDate = '2026-09-14';
  }

  exportCsv(): void {
    const header = ['Invoice', 'Date', 'Supplier', 'Items', 'Total', 'Paid', 'Payable', 'Status'];
    const lines = this.rows.map((row) => [row.invoice, row.date, row.supplier, row.items, row.total, row.paid, row.total - row.paid, row.status]);
    const csv = [header, ...lines].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'purchase-report.csv';
    link.click();
    URL.revokeObjectURL(link.href);
    this.notice = `${this.rows.length}টি purchase record CSV হিসেবে export করা হয়েছে।`;
  }

  printReport(): void { window.print(); }

}
