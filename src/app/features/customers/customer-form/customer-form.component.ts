import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CustomerType, CUSTOMER_TYPE_LABELS } from '../models/customer.model';
import { apiErrorMessage } from '../../../core/services/api.service';
import { CustomerService } from '../services/customer.service';

const BD_MOBILE_PATTERN = /^01[3-9]\d{2}-?\d{6}$/;

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, IconComponent],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly customerService = inject(CustomerService);

  readonly typeLabels = CUSTOMER_TYPE_LABELS;
  readonly typeOptions: CustomerType[] = ['retail', 'wholesale', 'walk-in'];

  private readonly idParam = this.route.snapshot.paramMap.get('id');
  readonly editingCustomerId = this.idParam ? Number(this.idParam) : null;
  readonly isEditMode = this.editingCustomerId !== null;

  readonly notFound = signal(false);
  readonly justSaved = signal(false);
  readonly saveError = signal('');
  /** The form has no email field, so keep whatever the server already has instead of wiping it on edit. */
  private existingEmail: string | null = null;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(BD_MOBILE_PATTERN)]],
    address: [''],
    type: ['retail' as CustomerType, [Validators.required]],
    creditLimit: [0, [Validators.required, Validators.min(0)]],
    openingBalance: [0, [Validators.required, Validators.min(0)]],
    status: ['active' as 'active' | 'inactive', [Validators.required]],
  });

  constructor() {
    if (this.isEditMode) {
      this.customerService.fetchOne(this.editingCustomerId!).subscribe({
        next: (existing) => {
          this.existingEmail = existing.email ?? null;
          this.form.patchValue({
            name: existing.name,
            phone: existing.phone,
            address: existing.address,
            type: existing.type,
            creditLimit: existing.creditLimit,
            openingBalance: existing.openingBalance,
            status: existing.status,
          });
        },
        error: () => this.notFound.set(true),
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const payload = {
      name: v.name.trim(),
      phone: v.phone.trim() || null,
      email: this.existingEmail,
      address: v.address.trim() || null,
      creditLimit: Number(v.creditLimit) || 0,
    };

    this.saveError.set('');
    this.justSaved.set(false);

    const request$ = this.isEditMode
      ? this.customerService.update(this.editingCustomerId!, payload)
      : this.customerService.create(payload);

    request$.subscribe({
      next: (saved) => {
        this.justSaved.set(true);
        setTimeout(() => this.router.navigate(['/customers', saved.id]), 500);
      },
      error: (err) => this.saveError.set(apiErrorMessage(err)),
    });
  }
}
