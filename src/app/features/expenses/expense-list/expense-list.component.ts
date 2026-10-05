import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { formatTaka, formatDateBn } from '../../../shared/utils/bn-format';
import { ExpenseService } from '../services/expense.service';
import { EXPENSE_STATUS_LABELS, ExpenseStatus } from '../models/expense.model';

type StatusFilter = 'all' | ExpenseStatus;

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {
  private readonly expenseService = inject(ExpenseService);

  readonly formatTaka = formatTaka;
  readonly formatDateBn = formatDateBn;
  readonly statusLabels = EXPENSE_STATUS_LABELS;

  readonly searchTerm = signal('');
  readonly statusFilter = signal<StatusFilter>('all');

  readonly statusFilters: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'সব খরচ' },
    { value: 'paid', label: 'পরিশোধিত' },
    { value: 'due', label: 'বাকি' },
  ];

  readonly totalThisMonth = this.expenseService.totalThisMonth;
  readonly totalDue = this.expenseService.totalDue;
  readonly totalCount = computed(() => this.expenseService.expenses().length);

  readonly filteredExpenses = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();
    return this.expenseService
      .expenses()
      .filter((e) => (status === 'all' ? true : e.status === status))
      .filter(
        (e) =>
          !term ||
          e.category.toLowerCase().includes(term) ||
          e.expenseNo.toLowerCase().includes(term) ||
          e.note.toLowerCase().includes(term),
      );
  });

  clearSearch(): void {
    this.searchTerm.set('');
  }
}
