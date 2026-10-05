import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { apiErrorMessage } from '../../../core/services/api.service';
import { CatalogService, CategoryView } from '../services/catalog.service';

@Component({selector:'app-category',standalone:true,imports:[CommonModule,FormsModule,RouterLink],templateUrl:'./category.component.html',styleUrl:'./category.component.scss'})
export class CategoryComponent {
  private readonly catalog = inject(CatalogService);

  name = '';
  description = '';
  editingId: number | null = null;
  search = '';
  message = '';

  constructor() {
    this.catalog.loadCategories();
  }

  get categories(): CategoryView[] {
    return this.catalog.categories();
  }

  get filtered(): CategoryView[] {
    const q = this.search.trim().toLowerCase();
    return this.categories.filter((x) => !q || x.name.toLowerCase().includes(q));
  }

  edit(x: CategoryView): void {
    this.editingId = x.id;
    this.name = x.name;
    this.description = x.description;
  }

  save(): void {
    const name = this.name.trim();
    if (!name) {
      this.flash('Category name is required');
      return;
    }
    const body = { name };
    const request$ = this.editingId
      ? this.catalog.updateCategory(this.editingId, body)
      : this.catalog.createCategory(body);

    request$.subscribe({
      next: () => {
        this.resetForm();
        this.flash('Saved successfully');
      },
      error: (err) => this.flash(apiErrorMessage(err)),
    });
  }

  remove(x: CategoryView): void {
    if (!confirm(`Delete ${x.name}?`)) return;
    this.catalog.deleteCategory(x.id).subscribe({
      error: (err) => this.flash(apiErrorMessage(err)),
    });
  }

  /** The backend has no active/inactive flag for categories yet, so there is nothing to save. */
  toggle(_x: CategoryView): void {
    this.flash('ক্যাটাগরির সক্রিয়/নিষ্ক্রিয় ফিচার ব্যাকএন্ডে এখনো নেই।');
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
