import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CustomerPortalService } from '../../../features/customer-portal/services/customer-portal.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-portal-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './portal-header.component.html',
  styleUrl: './portal-header.component.scss',
})
export class PortalHeaderComponent {
  constructor(
    public portal: CustomerPortalService,
    private router: Router,
  ) {}

  logout(): void {
    this.portal.logout();
    this.router.navigateByUrl('/portal/login');
  }
}
