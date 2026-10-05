import { Component, computed, signal } from '@angular/core';
import { CustomerPortalService } from '../services/customer-portal.service';
import { PORTAL_CATEGORIES } from '../portal-product.data';

@Component({
  selector: 'app-customer-portal-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  readonly categories = PORTAL_CATEGORIES;
  readonly selectedCategory = signal('সব');
  readonly searchTerm = signal('');

  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const term = this.searchTerm().trim().toLowerCase();
    return this.portal.products().filter(p =>
      (category === 'সব' || p.category === category) &&
      (!term || p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term))
    );
  });

  constructor(public portal: CustomerPortalService) {}

  selectCategory(category: string): void { this.selectedCategory.set(category); }
  search(event: Event): void { this.searchTerm.set((event.target as HTMLInputElement).value); }
  add(id: number): void { this.portal.addToCart(id); }
  increase(id: number): void { this.portal.addToCart(id); }
  decrease(id: number): void { this.portal.decreaseCart(id); }
  remove(id: number): void { this.portal.removeFromCart(id); }
  formatTaka(value: number): string { return `৳${value.toLocaleString('bn-BD')}`; }

  checkoutMessage(): void {
    window.alert('ডেমো অর্ডার প্রস্তুত। পরবর্তী ধাপে Backend API যুক্ত হলে এখান থেকেই Order তৈরি হবে।');
  }
}
