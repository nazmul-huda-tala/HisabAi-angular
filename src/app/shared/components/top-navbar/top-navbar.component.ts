import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { IconComponent } from '../icon/icon.component';
import { LayoutUiService } from '../../../core/services/layout-ui.service';
import { AuthService } from '../../../core/auth/auth.service';

interface PageMeta {
  title: string;
  eyebrow: string;
}

/** Bangla title/eyebrow per top-level section, keyed by the route's first path segment. */
const PAGE_META: Record<string, PageMeta> = {
  dashboard: { title: 'ড্যাশবোর্ড', eyebrow: 'আজকের ব্যবসা' },
  pos: { title: 'POS বিক্রয়', eyebrow: 'পয়েন্ট অফ সেল' },
  products: { title: 'পণ্য', eyebrow: 'পণ্য ব্যবস্থাপনা' },
  'product-categories': { title: 'পণ্যের ক্যাটাগরি', eyebrow: 'পণ্য ব্যবস্থাপনা' },
  'product-brands': { title: 'পণ্যের ব্র্যান্ড', eyebrow: 'পণ্য ব্যবস্থাপনা' },
  'product-units': { title: 'পণ্যের ইউনিট', eyebrow: 'পণ্য ব্যবস্থাপনা' },
  customers: { title: 'কাস্টমার', eyebrow: 'কাস্টমার ব্যবস্থাপনা' },
  suppliers: { title: 'সরবরাহকারী', eyebrow: 'সরবরাহকারী ব্যবস্থাপনা' },
  purchases: { title: 'ক্রয়', eyebrow: 'ক্রয় ব্যবস্থাপনা' },
  'purchase-returns': { title: 'ক্রয় ফেরত', eyebrow: 'ক্রয় ব্যবস্থাপনা' },
  inventory: { title: 'ইনভেন্টরি', eyebrow: 'স্টক ব্যবস্থাপনা' },
  sales: { title: 'বিক্রয় তালিকা', eyebrow: 'বিক্রয় ব্যবস্থাপনা' },
  'sales-returns': { title: 'বিক্রয় ফেরত', eyebrow: 'বিক্রয় ব্যবস্থাপনা' },
  payments: { title: 'পেমেন্ট', eyebrow: 'হিসাব ব্যবস্থাপনা' },
  dues: { title: 'বাকি হিসাব', eyebrow: 'হিসাব ব্যবস্থাপনা' },
  expenses: { title: 'খরচ', eyebrow: 'হিসাব ব্যবস্থাপনা' },
  reports: { title: 'রিপোর্ট', eyebrow: 'ব্যবসার প্রতিবেদন' },
  employees: { title: 'কর্মচারী', eyebrow: 'কর্মচারী ব্যবস্থাপনা' },
  settings: { title: 'সেটিংস', eyebrow: 'অ্যাকাউন্ট ব্যবস্থাপনা' },
  storefront: { title: 'স্টোরফ্রন্ট', eyebrow: 'অনলাইন দোকান' },
  'online-orders': { title: 'অনলাইন অর্ডার', eyebrow: 'অনলাইন দোকান' },
};

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss',
})
export class TopNavbarComponent {
  private readonly layoutUi = inject(LayoutUiService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  readonly pageTitle = signal(PAGE_META['dashboard'].title);
  readonly pageEyebrow = signal(PAGE_META['dashboard'].eyebrow);
  /** Hidden on the dashboard home — shown on every other page in the app. */
  readonly showBack = signal(false);

  constructor() {
    this.updateFromUrl(this.router.url);
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      this.updateFromUrl((e as NavigationEnd).urlAfterRedirects);
    });
  }

  private updateFromUrl(url: string): void {
    const path = url.split('?')[0];
    const segments = path.split('/').filter(Boolean);
    const key = segments[0] ?? 'dashboard';
    const meta = PAGE_META[key] ?? PAGE_META['dashboard'];

    this.pageTitle.set(meta.title);
    this.pageEyebrow.set(meta.eyebrow);
    this.showBack.set(key !== 'dashboard' && key !== '');
  }

  goBack(): void {
    this.location.back();
  }

  toggleSidebar(): void {
    this.layoutUi.toggleSidebar();
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login';
  }
}
