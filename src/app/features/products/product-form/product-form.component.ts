import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { apiErrorMessage } from '../../../core/services/api.service';
import { PRODUCT_UNITS } from '../models/product.model';
import { CatalogService } from '../services/catalog.service';
import { ProductPayload, ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  readonly catalog = inject(CatalogService);

  productForm!: FormGroup;
  readonly units: readonly string[] = PRODUCT_UNITS;

  private readonly idParam = this.route.snapshot.paramMap.get('id');
  readonly editingProductId = this.idParam ? Number(this.idParam) : null;
  readonly isEditMode = this.editingProductId !== null;

  readonly isSaving = signal(false);
  readonly saveError = signal('');

  ngOnInit(): void {
    this.catalog.loadAll();

    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      sku: [''],
      barcode: [''],
      categoryId: [null as number | null],
      brandId: [null as number | null],
      unit: ['', Validators.required],
      costPrice: [0, [Validators.required, Validators.min(0)]],
      sellingPrice: [null as number | null, [Validators.required, Validators.min(0)]],
      taxRate: [0, [Validators.min(0)]],
      reorderLevel: [0, [Validators.min(0)]],
      active: [true],
    });

    if (this.isEditMode) {
      this.productService.fetchOne(this.editingProductId!).subscribe({
        next: (p) =>
          this.productForm.patchValue({
            name: p.name,
            sku: p.sku ?? '',
            barcode: p.barcode ?? '',
            categoryId: p.categoryId,
            brandId: p.brandId,
            unit: p.unit ?? '',
            costPrice: Number(p.costPrice ?? 0),
            sellingPrice: Number(p.sellingPrice),
            taxRate: Number(p.taxRate ?? 0),
            reorderLevel: p.reorderLevel ?? 0,
            active: p.active,
          }),
        error: (err) => this.saveError.set(apiErrorMessage(err)),
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const v = this.productForm.value;
    const payload: ProductPayload = {
      name: String(v.name).trim(),
      sku: v.sku?.trim() || null,
      barcode: v.barcode?.trim() || null,
      categoryId: v.categoryId ? Number(v.categoryId) : null,
      brandId: v.brandId ? Number(v.brandId) : null,
      unit: v.unit || null,
      costPrice: Number(v.costPrice) || 0,
      sellingPrice: Number(v.sellingPrice),
      taxRate: Number(v.taxRate) || 0,
      reorderLevel: Number(v.reorderLevel) || 0,
      active: !!v.active,
    };

    this.isSaving.set(true);
    this.saveError.set('');

    const request$ = this.isEditMode
      ? this.productService.update(this.editingProductId!, payload)
      : this.productService.create(payload);

    request$.subscribe({
      next: (saved) => {
        this.isSaving.set(false);
        this.router.navigate(['/products', saved.id]);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.saveError.set(apiErrorMessage(err));
      },
    });
  }

  onReset(): void {
    this.productForm.reset({ costPrice: 0, taxRate: 0, reorderLevel: 0, active: true });
  }
}
