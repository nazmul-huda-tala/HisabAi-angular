import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { formatTaka, formatDateBn } from '../../../shared/utils/bn-format';
import { EXPENSE_STATUS_LABELS } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './expense-details.component.html',
  styleUrl: './expense-details.component.scss'
})
export class ExpenseDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly expenseService = inject(ExpenseService);

  readonly formatTaka = formatTaka;
  readonly formatDateBn = formatDateBn;
  readonly statusLabels = EXPENSE_STATUS_LABELS;

  private readonly expenseId = signal<number>(Number(this.route.snapshot.paramMap.get('id')));

  readonly expense = computed(() => this.expenseService.getById(this.expenseId()) ?? null);

  deleteExpense(): void {
    const e = this.expense();
    if (!e) return;
    if (confirm(`"${e.expenseNo}" খরচটি মুছে ফেলতে চান?`)) {
      this.expenseService.remove(e.id);
      this.router.navigate(['/expenses']);
    }
  }
}
