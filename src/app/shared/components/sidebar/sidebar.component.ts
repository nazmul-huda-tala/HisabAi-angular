import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent, IconName } from '../icon/icon.component';
import { LayoutUiService } from '../../../core/services/layout-ui.service';
import { AuthService } from '../../../core/auth/auth.service';
import { UserRole } from '../../../core/models/user.model';

interface NavItem {
  label: string;
  route: string;
  icon: IconName;
  /** Omit to show this item to every logged-in role. */
  roles?: UserRole[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private layoutUi = inject(LayoutUiService);
  private auth = inject(AuthService);
  readonly sidebarOpen = this.layoutUi.sidebarOpen;
  readonly sidebarCollapsed = this.layoutUi.sidebarCollapsed;

  /** Roles that primarily deal with sales/customers at the counter. */
  private static readonly SALES_ROLES: UserRole[] = ['owner', 'admin', 'manager', 'cashier'];
  /** Roles that deal with stock/procurement. */
  private static readonly STOCK_ROLES: UserRole[] = ['owner', 'admin', 'manager', 'inventory_staff'];
  /** Roles that deal with money/accounts beyond day-to-day sales. */
  private static readonly FINANCE_ROLES: UserRole[] = ['owner', 'admin', 'manager', 'accountant'];

  private readonly allPrimaryNavigation: NavItem[] = [
    { label: 'ড্যাশবোর্ড', route: '/dashboard', icon: 'home' },
    { label: 'POS বিক্রয়', route: '/pos', icon: 'cart', roles: SidebarComponent.SALES_ROLES },
    { label: 'পণ্য', route: '/products', icon: 'box', roles: SidebarComponent.STOCK_ROLES },
    { label: 'কাস্টমার', route: '/customers', icon: 'user', roles: SidebarComponent.SALES_ROLES },
    { label: 'সরবরাহকারী', route: '/suppliers', icon: 'truck', roles: SidebarComponent.STOCK_ROLES },
  ];

  private readonly allBusinessNavigation: NavItem[] = [
    { label: 'ক্রয়', route: '/purchases', icon: 'arrow-down', roles: SidebarComponent.STOCK_ROLES },
    { label: 'ইনভেন্টরি', route: '/inventory', icon: 'layers', roles: SidebarComponent.STOCK_ROLES },
    { label: 'বিক্রয় তালিকা', route: '/sales', icon: 'arrow-up-right', roles: SidebarComponent.SALES_ROLES },
    { label: 'বাকি হিসাব', route: '/dues/customers', icon: 'taka', roles: SidebarComponent.SALES_ROLES },
    { label: 'খরচ', route: '/expenses', icon: 'minus', roles: SidebarComponent.FINANCE_ROLES },
  ];

  private readonly allSupportNavigation: NavItem[] = [
    { label: 'রিপোর্ট', route: '/reports/sales', icon: 'bar-chart', roles: SidebarComponent.FINANCE_ROLES },
    { label: 'কর্মী', route: '/employees', icon: 'user', roles: ['owner', 'admin'] },
    { label: 'সেটিংস', route: '/settings/business', icon: 'settings', roles: ['owner', 'admin'] },
  ];

  /** Keeps only the items the logged-in role may open, so the sidebar never links to a page it'll just bounce back from. */
  private filterByRole(items: NavItem[]): NavItem[] {
    const role = this.auth.currentUser()?.role;
    return items.filter(item => !item.roles || (role && item.roles.includes(role)));
  }

  readonly primaryNavigation = computed<NavItem[]>(() => this.filterByRole(this.allPrimaryNavigation));
  readonly businessNavigation = computed<NavItem[]>(() => this.filterByRole(this.allBusinessNavigation));
  readonly supportNavigation = computed<NavItem[]>(() => this.filterByRole(this.allSupportNavigation));

  toggleCollapse(): void {
    this.layoutUi.toggleSidebarCollapse();
  }

  closeOnMobile(): void {
    this.layoutUi.closeSidebar();
  }
}
