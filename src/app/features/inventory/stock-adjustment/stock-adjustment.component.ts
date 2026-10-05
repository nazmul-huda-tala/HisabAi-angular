import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { formatCount, formatTaka } from '../../../shared/utils/bn-format';
import { ADJUSTMENT_REASON_LABELS, AdjustmentReason, InventoryItem } from '../models/inventory.model';
import { InventoryService } from '../services/inventory.service';

type Direction = 'in' | 'out';

@Component({
  selector: 'app-stock-adjustment',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, IconComponent],
  templateUrl: './stock-adjustment.component.html',
  styleUrl: './stock-adjustment.component.scss',
})
export class StockAdjustmentComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly inventory = inject(InventoryService);

  readonly formatTaka = formatTaka;
  readonly formatCount = formatCount;
  readonly reasonLabels = ADJUSTMENT_REASON_LABELS;
  readonly reasonOptions: AdjustmentReason[] = ['damage', 'lost', 'expired', 'counting-error', 'other'];

  readonly items = this.inventory.stockItems;
  readonly justSaved = signal(false);

  private readonly requestedProductId = Number(this.route.snapshot.queryParamMap.get('productId')) || null;

  private readonly initialProductId =
    this.requestedProductId && this.inventory.getItem(this.requestedProductId)
      ? this.requestedProductId
      : (this.items()[0]?.id ?? null);

  readonly form = this.fb.nonNullable.group({
    productId: [this.initialProductId, [Validators.required]],
    direction: ['in' as Direction, [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    reason: ['counting-error' as AdjustmentReason, [Validators.required]],
    note: [''],
  });

  get f() {
    return this.form.controls;
  }

  get selectedItem(): InventoryItem | null {
    const id = Number(this.form.controls.productId.value);
    return this.inventory.getItem(id) ?? null;
  }

  get projectedStock(): number {
    const item = this.selectedItem;
    if (!item) return 0;
    const qty = Number(this.form.controls.quantity.value) || 0;
    const direction = this.form.controls.direction.value;
    const delta = direction === 'in' ? qty : -qty;
    return Math.max(0, item.currentStock + delta);
  }

  get noteRequired(): boolean {
    return this.form.controls.reason.value === 'other';
  }

  setDirection(direction: Direction): void {
    this.form.controls.direction.setValue(direction);
  }

  onSubmit(): void {
    const note = this.form.controls.note.value.trim();
    if (this.noteRequired && !note) {
      this.form.controls.note.setErrors({ required: true });
    }

    if (this.form.invalid || !this.selectedItem) {
      this.form.markAllAsTouched();
      return;
    }

    const { productId, direction, quantity, reason } = this.form.getRawValue();

    // TODO: replace with InventoryService.adjustStock() call to the backend
    // once the Inventory endpoints exist — this is static/demo only for now.
    this.inventory.adjustStock(Number(productId), direction, Number(quantity), reason, note);
    this.justSaved.set(true);

    setTimeout(() => {
      this.router.navigate(['/inventory']);
    }, 700);
  }
}
