import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierService } from '../services/supplier.service';
import { PaymentTerms, PAYMENT_TERMS_LABELS } from '../models/supplier.model';
import { apiErrorMessage } from '../../../core/services/api.service';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.scss'
})
export class SupplierFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly supplierService = inject(SupplierService);

  supplierForm!: FormGroup;
  termsLabels = PAYMENT_TERMS_LABELS;
  termsOptions: PaymentTerms[] = ['cash', 'due-7', 'due-15', 'due-30'];

  private readonly idParam = this.route.snapshot.paramMap.get('id');
  readonly editingSupplierId = this.idParam ? Number(this.idParam) : null;
  readonly isEditMode = this.editingSupplierId !== null;

  readonly notFound = signal(false);
  readonly isSaving = signal(false);
  readonly saveError = signal('');

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      contactPerson: [''],
      phone: ['', [Validators.required, Validators.pattern('^[0-9+ -]{7,15}$')]],
      email: ['', [Validators.email]],
      paymentTerms: ['due-30' as PaymentTerms, Validators.required],
      openingBalance: [0, [Validators.min(0)]],
      address: ['', Validators.required],
      note: [''],
      status: ['active' as 'active' | 'inactive', Validators.required],
    });

    if (this.isEditMode) {
      this.supplierService.fetchOne(this.editingSupplierId!).subscribe({
        next: (existing) =>
          this.supplierForm.patchValue({
            companyName: existing.companyName,
            contactPerson: '',
            phone: existing.phone,
            email: existing.email ?? '',
            paymentTerms: existing.paymentTerms,
            openingBalance: existing.openingBalance,
            address: existing.address,
            note: '',
            status: existing.status,
          }),
        error: () => this.notFound.set(true),
      });
    }
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      return;
    }

    const v = this.supplierForm.value;
    // The backend stores a single supplier name (the company); contact person, note,
    // status and opening balance have no backend column yet, so they are not sent.
    const payload = {
      name: String(v.companyName).trim(),
      phone: v.phone?.trim() || null,
      email: v.email?.trim() || null,
      address: v.address?.trim() || null,
      paymentTerms: v.paymentTerms as string,
    };

    this.isSaving.set(true);
    this.saveError.set('');

    const request$ = this.isEditMode
      ? this.supplierService.update(this.editingSupplierId!, payload)
      : this.supplierService.create(payload);

    request$.subscribe({
      next: (saved) => {
        this.isSaving.set(false);
        this.router.navigate(['/suppliers', saved.id]);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.saveError.set(apiErrorMessage(err));
      },
    });
  }

  onReset(): void {
    this.supplierForm.reset({ openingBalance: 0, paymentTerms: 'due-30', status: 'active' });
  }
}
