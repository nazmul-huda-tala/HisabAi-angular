import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface CartItem { id:number; name:string; sku:string; price:number; qty:number; stock:number; barcode:string; category:string; }
interface HeldSale { id:number; customer:string; items:CartItem[]; total:number; time:string; }

@Component({
  selector: 'app-hold-sales',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hold-sales.component.html',
  styleUrl: './hold-sales.component.scss'
})
export class HoldSalesComponent implements OnInit {
  heldSales: HeldSale[] = [];
  message = '';

  constructor(private router: Router) {}

  ngOnInit(): void { this.load(); }

  getItemsCount(sale: HeldSale): number { return sale.items.reduce((n, i) => n + i.qty, 0); }

  resume(sale: HeldSale): void {
    // The POS page owns the active cart; pass the held sale through session storage.
    sessionStorage.setItem('hishabai.resumeSale', JSON.stringify(sale));
    this.heldSales = this.heldSales.filter(s => s.id !== sale.id);
    localStorage.setItem('hishabai.heldSales', JSON.stringify(this.heldSales));
    this.router.navigate(['/pos']);
  }

  remove(sale: HeldSale): void {
    this.heldSales = this.heldSales.filter(s => s.id !== sale.id);
    localStorage.setItem('hishabai.heldSales', JSON.stringify(this.heldSales));
    this.message = 'Hold করা বিক্রয় মুছে দেওয়া হয়েছে';
    setTimeout(() => this.message = '', 1800);
  }

  clearAll(): void {
    this.heldSales = [];
    localStorage.removeItem('hishabai.heldSales');
  }

  private load(): void {
    try { this.heldSales = JSON.parse(localStorage.getItem('hishabai.heldSales') || '[]'); }
    catch { this.heldSales = []; }
  }
}
