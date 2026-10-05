import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatTaka, formatDateBn } from '../../../shared/utils/bn-format';
import { ReportService, SalesReportRow } from '../services/report.service';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss',
})
export class SalesReportComponent {
  private readonly reportService = inject(ReportService);

  readonly allRows = this.reportService.getSalesReport();
  searchTerm = '';
  statusFilter = 'All';
  fromDate = '2026-09-01';
  toDate = '2026-09-14';
  notice = '';

  get rows(): SalesReportRow[] {
    const search = this.searchTerm.trim().toLowerCase();
    return this.allRows.filter((row) => {
      const matchesSearch = !search || `${row.invoice} ${row.customer}`.toLowerCase().includes(search);
      const matchesStatus = this.statusFilter === 'All' || row.status === this.statusFilter;
      return matchesSearch && matchesStatus && row.date >= this.fromDate && row.date <= this.toDate;
    });
  }

  get totalSales(): number { return this.rows.reduce((sum, row) => sum + row.total, 0); }
  get totalPaid(): number { return this.rows.reduce((sum, row) => sum + row.paid, 0); }
  get totalDue(): number { return this.totalSales - this.totalPaid; }
  get averageOrder(): number { return this.rows.length ? Math.round(this.totalSales / this.rows.length) : 0; }
  get maxDailySales(): number { return Math.max(...this.dailySales.map((item) => item.value), 1); }

  readonly dailySales = [
    { label: '১ Sep', value: 2240 },
    { label: '২ Sep', value: 3180 },
    { label: '৩ Sep', value: 5380 },
    { label: '৪ Sep', value: 4120 },
    { label: '৫ Sep', value: 4660 },
    { label: '৬ Sep', value: 2860 },
    { label: '৭ Sep', value: 3240 },
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
    const header = ['Invoice', 'Date', 'Customer', 'Items', 'Total', 'Paid', 'Due', 'Status'];
    const lines = this.rows.map((row) => [row.invoice, row.date, row.customer, row.items, row.total, row.paid, row.total - row.paid, row.status]);
    this.downloadCsv('sales-report.csv', [header, ...lines]);
    this.notice = `${this.rows.length}টি sales record CSV হিসেবে export করা হয়েছে।`;
  }

  printReport(): void {
    window.print();
  }

  private downloadCsv(filename: string, rows: unknown[][]): void {
    const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

}
