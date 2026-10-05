import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { apiErrorMessage } from '../../../core/services/api.service';
import { BrandView, CatalogService } from '../services/catalog.service';

@Component({selector:'app-brand',standalone:true,imports:[CommonModule,FormsModule,RouterLink],templateUrl:'./brand.component.html',styleUrl:'./brand.component.scss'})
export class BrandComponent {
  private readonly catalog = inject(CatalogService);

  name = '';
  description = '';
  editingId: number | null = null;
  search = '';
  message = '';

  constructor() {
    this.catalog.loadBrands();
  }

  get brands(): BrandView[] {
    return this.catalog.brands();
  }

  get filtered(): BrandView[] {
    const q = this.search.trim().toLowerCase();
    return this.brands.filter((x) => !q || x.name.toLowerCase().includes(q));
  }

  edit(x: BrandView): void {
    this.editingId = x.id;
    this.name = x.name;
    this.description = x.description;
  }

  save(): void {
    const name = this.name.trim();
    if (!name) {
      this.flash('Brand name is required');
      return;
    }
    const existing = this.brands.find((b) => b.id === this.editingId);
    const body = { name, active: existing?.active ?? true };
    const request$ = this.editingId
      ? this.catalog.updateBrand(this.editingId, body)
      : this.catalog.createBrand(body);

    request$.subscribe({
      next: () => {
        this.resetForm();
        this.flash('Saved successfully');
      },
      error: (err) => this.flash(apiErrorMessage(err)),
    });
  }

  remove(x: BrandView): void {
    if (!confirm(`Delete ${x.name}?`)) return;
    this.catalog.deleteBrand(x.id).subscribe({
      error: (err) => this.flash(apiErrorMessage(err)),
    });
  }

  toggle(x: BrandView): void {
    this.catalog.updateBrand(x.id, { name: x.name, active: !x.active }).subscribe({
      error: (err) => this.flash(apiErrorMessage(err)),
    });
  }

  reset(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.name = '';
    this.description = '';
    this.editingId = null;
  }

  private flash(text: string): void {
    this.message = text;
    setTimeout(() => (this.message = ''), 3000);
  }
}
