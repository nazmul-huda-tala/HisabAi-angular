import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomerPortalService } from '../services/customer-portal.service';

@Component({
  selector: 'app-customer-portal-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './customer-portal-layout.component.html',
  styleUrl: './customer-portal-layout.component.scss',
})
export class CustomerPortalLayoutComponent {
  sidebarOpen = true;
  readonly currentYear = new Date().getFullYear();

  constructor(public portal: CustomerPortalService, private router: Router) {}

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(): void {
    this.portal.logout();
    this.router.navigateByUrl('/portal/login');
  }
}
