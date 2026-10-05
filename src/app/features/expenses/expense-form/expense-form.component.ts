import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EXPENSE_CATEGORIES, ExpensePaymentMethod, ExpenseStatus } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly expenseService = inject(ExpenseService);

  expenseForm!: FormGroup;
  categories = EXPENSE_CATEGORIES;
  paymentMethods: ExpensePaymentMethod[] = ['Cash', 'bKash', 'Nagad', 'Bank'];

  editingId: number | null = null;
  attachmentName: string | null = null;

  get isEditMode(): boolean {
    return this.editingId !== null;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const existing = idParam ? this.expenseService.getById(Number(idParam)) : undefined;

    if (existing) {
      this.editingId = existing.id;
      this.attachmentName = existing.attachmentName;
    }

    this.expenseForm = this.fb.group({
      expenseDate: [existing?.date ?? new Date().toISOString().substring(0, 10), Validators.required],
      category: [existing?.category ?? '', Validators.required],
      amount: [existing?.amount ?? null, [Validators.required, Validators.min(1)]],
      paymentMethod: [existing?.paymentMethod ?? 'Cash', Validators.required],
      status: [existing?.status ?? 'paid', Validators.required],
      note: [existing?.note ?? ''],
    });
  }

  onAttachmentChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Demo-only: we just remember the file name, not its content.
    this.attachmentName = input.files && input.files.length > 0 ? input.files[0].name : null;
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    const value = this.expenseForm.getRawValue();
    const payload = {
      category: value.category,
      amount: Number(value.amount),
      date: value.expenseDate,
      paymentMethod: value.paymentMethod as ExpensePaymentMethod,
      status: value.status as ExpenseStatus,
      note: value.note ?? '',
      attachmentName: this.attachmentName,
    };

    if (this.isEditMode && this.editingId !== null) {
      this.expenseService.update(this.editingId, payload);
      this.router.navigate(['/expenses', this.editingId]);
    } else {
      const created = this.expenseService.add(payload);
      this.router.navigate(['/expenses', created.id]);
    }
  }

  onReset(): void {
    this.expenseForm.reset({
      expenseDate: new Date().toISOString().substring(0, 10),
      paymentMethod: 'Cash',
      status: 'paid',
    });
    this.attachmentName = null;
  }
}
