import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomerPortalService } from '../services/customer-portal.service';
import { PortalProduct } from '../models/customer-portal.model';

@Component({
  selector: 'app-customer-portal-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly featuredProducts = computed<PortalProduct[]>(() => this.portal.products().slice(0, 6));

  constructor(public portal: CustomerPortalService) {}

  add(productId: number): void {
    this.portal.addToCart(productId);
  }

  formatTaka(value: number): string {
    return `৳${value.toLocaleString('bn-BD')}`;
  }
}
