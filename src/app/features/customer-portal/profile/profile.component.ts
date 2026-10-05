import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerPortalService } from '../services/customer-portal.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  form: FormGroup;
  savedMessage = false;

  constructor(
    private fb: FormBuilder,
    public portal: CustomerPortalService,
  ) {
    const customer = this.portal.currentCustomer();
    this.form = this.fb.group({
      name: [customer?.name ?? '', Validators.required],
      phone: [customer?.phone ?? '', Validators.required],
      email: [customer?.email ?? '', [Validators.email]],
      address: [customer?.address ?? '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.portal.updateProfile(this.form.value);
    this.savedMessage = true;
    setTimeout(() => (this.savedMessage = false), 2500);
  }
}
