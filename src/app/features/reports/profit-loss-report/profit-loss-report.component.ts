import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatDateBn, formatTaka } from '../../../shared/utils/bn-format';
import { ProfitLossRow, ReportService } from '../services/report.service';

@Component({
  selector: 'app-profit-loss-report',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './profit-loss-report.component.html',
  styleUrl: './profit-loss-report.component.scss',
})
export class ProfitLossReportComponent {
  private readonly reportService = inject(ReportService);
  readonly Math = Math;

  readonly allRows = this.reportService.getProfitLossReport();
  fromDate = '2026-09-01';
  toDate = '2026-09-14';
  searchTerm = '';
  typeFilter = 'All';
  notice = '';

  get rows(): ProfitLossRow[] {
    const search = this.searchTerm.trim().toLowerCase();
    return this.allRows.filter((row) => {
      const matchesSearch = !search || `${row.description} ${row.category}`.toLowerCase().includes(search);
      const matchesType = this.typeFilter === 'All' || row.type === this.typeFilter;
      return matchesSearch && matchesType && row.date >= this.fromDate && row.date <= this.toDate;
    });
  }

  get income(): number { return this.rows.filter((row) => row.type === 'Income').reduce((sum, row) => sum + row.amount, 0); }
  get expenses(): number { return this.rows.filter((row) => row.type === 'Expense').reduce((sum, row) => sum + row.amount, 0); }
  get netProfit(): number { return this.income - this.expenses; }
  get margin(): number { return this.income ? this.netProfit / this.income * 100 : 0; }
  get maxBreakdown(): number { return Math.max(...this.breakdown.map((item) => item.value), 1); }

  readonly breakdown = [
    { label: 'Cost of goods', value: 21200, tone: 'amber' },
    { label: 'Operating expense', value: 10880, tone: 'red' },
    { label: 'Other expense', value: 0, tone: 'blue' },
  ];

  formatMoney = formatTaka;
  formatDate = formatDateBn;

  resetFilters(): void {
    this.fromDate = '2026-09-01';
    this.toDate = '2026-09-14';
    this.searchTerm = '';
    this.typeFilter = 'All';
  }

  exportCsv(): void {
    const header = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const lines = this.rows.map((row) => [row.date, row.description, row.category, row.type, row.amount]);
    const csv = [header, ...lines].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'profit-loss-report.csv';
    link.click();
    URL.revokeObjectURL(link.href);
    this.notice = `${this.rows.length}টি transaction CSV হিসেবে export করা হয়েছে।`;
  }

  printReport(): void { window.print(); }

}
