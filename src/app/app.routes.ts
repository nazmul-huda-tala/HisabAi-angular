import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/auth/auth.guard';
import { guestGuard } from './core/auth/guest.guard';
import { customerPortalGuard, customerPortalGuestGuard } from './core/auth/customer-portal.guard';
import { roleGuard } from './core/auth/role.guard';
import { CustomerPortalLayoutComponent } from './features/customer-portal/layout/customer-portal-layout.component';
import { UserRole } from './core/models/user.model';

// Route ownership lives here; each feature page loads only when it is visited.
// Frontend route protection is handled here. Real JWT/RBAC is added later with the backend security step.
// These mirror the role groups the sidebar (shared/components/sidebar) uses to decide what to show,
// so a role that can't see a link in the sidebar can't reach it by typing the URL either.
const STOCK_ROLES: UserRole[] = ['owner', 'admin', 'manager', 'inventory_staff'];
const FINANCE_ROLES: UserRole[] = ['owner', 'admin', 'manager', 'accountant'];

export const routes: Routes = [
  // Public marketing landing page — sits at the true '/' root, in front of
  // the guarded MainLayoutComponent below (which also claims path ''). Since
  // this uses pathMatch: 'full' and is listed first, it only intercepts the
  // exact '/' URL; every other path (e.g. '/dashboard') falls through to the
  // MainLayoutComponent route beneath it as before.
  { path: '', pathMatch: 'full', title: 'HisabKhata', loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent) },
  {
    path: 'auth', component: AuthLayoutComponent,
    children: [
      { path: 'login', canActivate: [guestGuard], title: 'Sign in | HisabKhata', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', canActivate: [guestGuard], title: 'Create account | HisabKhata', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
      { path: 'forgot-password', canActivate: [guestGuard], title: 'Forgot password | HisabKhata', loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      { path: 'reset-password', canActivate: [guestGuard], title: 'Reset password | HisabKhata', loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [authGuard],
    children: [
      { path: 'dashboard', title: 'Dashboard | HisabKhata', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },

      { path: 'products', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Products | HisabKhata', loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent) },
      { path: 'products/new', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'New product | HisabKhata', loadComponent: () => import('./features/products/product-form/product-form.component').then(m => m.ProductFormComponent) },
      { path: 'products/:id/edit', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Edit product | HisabKhata', loadComponent: () => import('./features/products/product-form/product-form.component').then(m => m.ProductFormComponent) },
      { path: 'products/:id', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Product details | HisabKhata', loadComponent: () => import('./features/products/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
      { path: 'product-categories', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Product categories | HisabKhata', loadComponent: () => import('./features/products/category/category.component').then(m => m.CategoryComponent) },
      { path: 'product-brands', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Product brands | HisabKhata', loadComponent: () => import('./features/products/brand/brand.component').then(m => m.BrandComponent) },
      { path: 'product-units', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Product units | HisabKhata', loadComponent: () => import('./features/products/unit/unit.component').then(m => m.UnitComponent) },
      

      { path: 'customers', title: 'Customers | HisabKhata', loadComponent: () => import('./features/customers/customer-list/customer-list.component').then(m => m.CustomerListComponent) },
      { path: 'customers/new', title: 'New customer | HisabKhata', loadComponent: () => import('./features/customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent) },
      { path: 'customers/:id/edit', title: 'Edit customer | HisabKhata', loadComponent: () => import('./features/customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent) },
      { path: 'customers/:id/statement', title: 'Customer statement | HisabKhata', loadComponent: () => import('./features/customers/customer-statement/customer-statement.component').then(m => m.CustomerStatementComponent) },
      { path: 'customers/:id', title: 'Customer details | HisabKhata', loadComponent: () => import('./features/customers/customer-details/customer-details.component').then(m => m.CustomerDetailsComponent) },

      { path: 'suppliers', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Suppliers | HisabKhata', loadComponent: () => import('./features/suppliers/supplier-list/supplier-list.component').then(m => m.SupplierListComponent) },
      { path: 'suppliers/new', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'New supplier | HisabKhata', loadComponent: () => import('./features/suppliers/supplier-form/supplier-form.component').then(m => m.SupplierFormComponent) },
      { path: 'suppliers/:id/edit', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Edit supplier | HisabKhata', loadComponent: () => import('./features/suppliers/supplier-form/supplier-form.component').then(m => m.SupplierFormComponent) },
      { path: 'suppliers/:id/statement', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Supplier statement | HisabKhata', loadComponent: () => import('./features/suppliers/supplier-statement/supplier-statement.component').then(m => m.SupplierStatementComponent) },
      { path: 'suppliers/:id', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Supplier details | HisabKhata', loadComponent: () => import('./features/suppliers/supplier-details/supplier-details.component').then(m => m.SupplierDetailsComponent) },

      { path: 'purchases', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Purchases | HisabKhata', loadComponent: () => import('./features/purchases/purchase-list/purchase-list.component').then(m => m.PurchaseListComponent) },
      { path: 'purchases/new', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'New purchase | HisabKhata', loadComponent: () => import('./features/purchases/new-purchase/new-purchase.component').then(m => m.NewPurchaseComponent) },
      { path: 'purchases/:id', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Purchase details | HisabKhata', loadComponent: () => import('./features/purchases/purchase-details/purchase-details.component').then(m => m.PurchaseDetailsComponent) },
      { path: 'purchase-returns', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Purchase returns | HisabKhata', loadComponent: () => import('./features/purchases/purchase-return/purchase-return.component').then(m => m.PurchaseReturnComponent) },
      { path: 'inventory', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Inventory | HisabKhata', loadComponent: () => import('./features/inventory/stock-list/stock-list.component').then(m => m.StockListComponent) },
      { path: 'inventory/movements', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Stock movements | HisabKhata', loadComponent: () => import('./features/inventory/stock-movement/stock-movement.component').then(m => m.StockMovementComponent) },
      { path: 'inventory/adjustments', canActivate: [roleGuard], data: { roles: STOCK_ROLES }, title: 'Stock adjustments | HisabKhata', loadComponent: () => import('./features/inventory/stock-adjustment/stock-adjustment.component').then(m => m.StockAdjustmentComponent) },

      { path: 'sales', title: 'Sales | HisabKhata', loadComponent: () => import('./features/sales/sales-list/sales-list.component').then(m => m.SalesListComponent) },
      { path: 'sales/:id', title: 'Sale details | HisabKhata', loadComponent: () => import('./features/sales/sale-details/sale-details.component').then(m => m.SaleDetailsComponent) },
      { path: 'sales-returns', title: 'Sales returns | HisabKhata', loadComponent: () => import('./features/sales/sales-return/sales-return.component').then(m => m.SalesReturnComponent) },
      { path: 'pos', title: 'POS | HisabKhata', loadComponent: () => import('./features/pos/pos.component').then(m => m.PosComponent) },
      { path: 'pos/held-sales', title: 'Held sales | HisabKhata', loadComponent: () => import('./features/pos/hold-sales/hold-sales.component').then(m => m.HoldSalesComponent) },

      { path: 'payments', canActivate: [roleGuard], data: { roles: FINANCE_ROLES }, title: 'Payments | HisabKhata', loadComponent: () => import('./features/payments/payment-list/payment-list.component').then(m => m.PaymentListComponent) },
      { path: 'payments/receive', canActivate: [roleGuard], data: { roles: FINANCE_ROLES }, title: 'Receive payment | HisabKhata', loadComponent: () => import('./features/payments/receive-payment/receive-payment.component').then(m => m.ReceivePaymentComponent) },
      { path: 'dues/customers', title: 'Customer dues | HisabKhata', loadComponent: () => import('./features/due/customer-due/customer-due.component').then(m => m.CustomerDueComponent) },
      { path: 'dues/suppliers', canActivate: [roleGuard], data: { roles: FINANCE_ROLES }, title: 'Supplier payables | HisabKhata', loadComponent: () => import('./features/due/supplier-payable/supplier-payable.component').then(m => m.SupplierPayableComponent) },
      { path: 'expenses', canActivate: [roleGuard], data: { roles: FINANCE_ROLES }, title: 'Expenses | HisabKhata', loadComponent: () => import('./features/expenses/expense-list/expense-list.component').then(m => m.ExpenseListComponent) },
      { path: 'expenses/new', canActivate: [roleGuard], data: { roles: FINANCE_ROLES }, title: 'New expense | HisabKhata', loadComponent: () => import('./features/expenses/expense-form/expense-form.component').then(m => m.ExpenseFormComponent) },
      { path: 'expenses/:id/edit', canActivate: [roleGuard], data: { roles: FINANCE_ROLES }, title: 'Edit expense | HisabKhata', loadComponent: () => import('./features/expenses/expense-form/expense-form.component').then(m => m.ExpenseFormComponent) },
      { path: 'expenses/:id', canActivate: [roleGuard], data: { roles: FINANCE_ROLES }, title: 'Expense details | HisabKhata', loadComponent: () => import('./features/expenses/expense-details/expense-details.component').then(m => m.ExpenseDetailsComponent) },
      { path: 'reports/sales', canActivate: [roleGuard], data: { roles: FINANCE_ROLES }, title: 'Sales report | HisabKhata', loadComponent: () => import('./features/reports/sales-report/sales-report.component').then(m => m.SalesReportComponent) },
      { path: 'reports/purchases', canActivate: [roleGuard], data: { roles: FINANCE_ROLES }, title: 'Purchase report | HisabKhata', loadComponent: () => import('./features/reports/purchase-report/purchase-report.component').then(m => m.PurchaseReportComponent) },
      { path: 'reports/profit-loss', canActivate: [roleGuard], data: { roles: ['owner', 'admin', 'accountant'] }, title: 'Profit and loss | HisabKhata', loadComponent: () => import('./features/reports/profit-loss-report/profit-loss-report.component').then(m => m.ProfitLossReportComponent) },
      { path: 'employees', canActivate: [roleGuard], data: { roles: ['owner', 'admin'] }, title: 'Employees | HisabKhata', loadComponent: () => import('./features/employees/employee-list/employee-list.component').then(m => m.EmployeeListComponent) },
      { path: 'employees/new', canActivate: [roleGuard], data: { roles: ['owner', 'admin'] }, title: 'New employee | HisabKhata', loadComponent: () => import('./features/employees/employee-form/employee-form.component').then(m => m.EmployeeFormComponent) },
      { path: 'employees/:id/edit', canActivate: [roleGuard], data: { roles: ['owner', 'admin'] }, title: 'Edit employee | HisabKhata', loadComponent: () => import('./features/employees/employee-form/employee-form.component').then(m => m.EmployeeFormComponent) },
      { path: 'settings/business', canActivate: [roleGuard], data: { roles: ['owner', 'admin'] }, title: 'Business settings | HisabKhata', loadComponent: () => import('./features/settings/business-settings/business-settings.component').then(m => m.BusinessSettingsComponent) },
      { path: 'settings/users-roles', canActivate: [roleGuard], data: { roles: ['owner'] }, title: 'Users and roles | HisabKhata', loadComponent: () => import('./features/settings/users-roles/users-roles.component').then(m => m.UsersRolesComponent) },

      { path: 'online-orders', title: 'Online orders | HisabKhata', loadComponent: () => import('./features/online-orders/order-list/order-list.component').then(m => m.OrderListComponent) },
      { path: 'online-orders/:id', title: 'Online order details | HisabKhata', loadComponent: () => import('./features/online-orders/order-details/order-details.component').then(m => m.OrderDetailsComponent) },
      { path: 'online-orders/:id/status', title: 'Online order status | HisabKhata', loadComponent: () => import('./features/online-orders/order-status/order-status.component').then(m => m.OrderStatusComponent) },

      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },

  // Public customer-facing storefront (no auth guard — this is the customer's shopping view, not the admin panel).
  {
    path: 'store',
    children: [
      { path: '', pathMatch: 'full', title: 'Storefront | HisabKhata', loadComponent: () => import('./features/storefront/home/home.component').then(m => m.HomeComponent) },
      { path: 'products', title: 'Store products | HisabKhata', loadComponent: () => import('./features/storefront/product-list/product-list.component').then(m => m.ProductListComponent) },
      { path: 'products/:id', title: 'Store product | HisabKhata', loadComponent: () => import('./features/storefront/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
      { path: 'cart', title: 'Cart | HisabKhata', loadComponent: () => import('./features/storefront/cart/cart.component').then(m => m.CartComponent) },
      { path: 'checkout', title: 'Checkout | HisabKhata', loadComponent: () => import('./features/storefront/checkout/checkout.component').then(m => m.CheckoutComponent) },
    ],
  },

  // Customer self-service portal — deliberately separated from the staff/admin shell.
  {
    path: 'portal',
    children: [
      { path: 'login', canActivate: [customerPortalGuestGuard], title: 'Customer login | HisabKhata', loadComponent: () => import('./features/customer-portal/login/login.component').then(m => m.LoginComponent) },
      {
        path: '',
        component: CustomerPortalLayoutComponent,
        canActivate: [customerPortalGuard],
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'home' },
          { path: 'home', title: 'Customer home | HisabKhata', loadComponent: () => import('./features/customer-portal/home/home.component').then(m => m.HomeComponent) },
          { path: 'shop', title: 'Shop | HisabKhata', loadComponent: () => import('./features/customer-portal/shop/shop.component').then(m => m.ShopComponent) },
          { path: 'orders', title: 'My orders | HisabKhata', loadComponent: () => import('./features/customer-portal/my-orders/my-orders.component').then(m => m.MyOrdersComponent) },
          { path: 'orders/:id', title: 'Order details | HisabKhata', loadComponent: () => import('./features/customer-portal/order-details/order-details.component').then(m => m.OrderDetailsComponent) },
          { path: 'profile', title: 'Profile | HisabKhata', loadComponent: () => import('./features/customer-portal/profile/profile.component').then(m => m.ProfileComponent) },
        ],
      },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
