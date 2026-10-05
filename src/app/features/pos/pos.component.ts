import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  price: number;
  stock: number;
}

interface CartItem extends Product {
  qty: number;
}

interface HeldSale {
  id: number;
  customer: string;
  items: CartItem[];
  total: number;
  time: string;
}

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss'
})
export class PosComponent implements OnInit {
  search = '';
  barcode = '';
  customer = 'Walk-in Customer';
  paymentMethod = 'Cash';
  received = 0;
  showPayment = false;
  showCustomerMenu = false;
  message = '';
  lastInvoice = '';
  heldSales: HeldSale[] = [];

  readonly products: Product[] = [
    { id: 1, name: 'চাল মিনিকেট ৫ কেজি', sku: 'RICE-005', barcode: '890100000001', category: 'মুদি', price: 420, stock: 34 },
    { id: 2, name: 'সয়াবিন তেল ২ লিটার', sku: 'OIL-002', barcode: '890100000002', category: 'মুদি', price: 360, stock: 22 },
    { id: 3, name: 'আকিজ চিনি ১ কেজি', sku: 'SUG-001', barcode: '890100000003', category: 'মুদি', price: 125, stock: 48 },
    { id: 4, name: 'ডিম ১২ পিস', sku: 'EGG-012', barcode: '890100000004', category: 'দৈনন্দিন', price: 145, stock: 19 },
    { id: 5, name: 'ফ্রেশ দুধ ১ লিটার', sku: 'MILK-001', barcode: '890100000005', category: 'দৈনন্দিন', price: 95, stock: 16 },
    { id: 6, name: 'বিস্কুট ২০০ গ্রাম', sku: 'BIS-200', barcode: '890100000006', category: 'স্ন্যাকস', price: 55, stock: 41 },
    { id: 7, name: 'নুডলস ৮ প্যাক', sku: 'NOOD-008', barcode: '890100000007', category: 'মুদি', price: 88, stock: 27 },
    { id: 8, name: 'বোতলজাত পানি ১.৫L', sku: 'WTR-15', barcode: '890100000008', category: 'পানীয়', price: 35, stock: 60 },
    { id: 9, name: 'কফি ১০০ গ্রাম', sku: 'COF-100', barcode: '890100000009', category: 'পানীয়', price: 210, stock: 13 },
    { id: 10, name: 'টিস্যু বক্স', sku: 'TIS-001', barcode: '890100000010', category: 'গৃহস্থালি', price: 75, stock: 25 }
  ];

  cart: CartItem[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadHeldSales();
    const resume = sessionStorage.getItem('hishabai.resumeSale');
    if (resume) {
      try {
        const held = JSON.parse(resume) as HeldSale;
        this.cart = held.items.map(i => ({ ...i }));
        this.customer = held.customer;
        sessionStorage.removeItem('hishabai.resumeSale');
      } catch { sessionStorage.removeItem('hishabai.resumeSale'); }
    }
  }

  get filteredProducts(): Product[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.products.slice(0, 8);
    return this.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.barcode.includes(q)
    ).slice(0, 10);
  }

  get subtotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  get discount(): number { return 0; }
  get vat(): number { return 0; }
  get total(): number { return this.subtotal - this.discount + this.vat; }
  get change(): number { return Math.max(0, Number(this.received || 0) - this.total); }

  addProduct(product: Product): void {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty < product.stock) existing.qty++;
    } else {
      this.cart.push({ ...product, qty: 1 });
    }
    this.search = '';
    this.barcode = '';
    this.flash(`${product.name} কার্টে যোগ হয়েছে`);
  }

  scanBarcode(): void {
    const code = this.barcode.trim();
    if (!code) return;
    const product = this.products.find(p => p.barcode === code || p.sku.toLowerCase() === code.toLowerCase());
    if (product) {
      this.addProduct(product);
    } else {
      this.flash('বারকোডটি পাওয়া যায়নি');
    }
  }

  increase(item: CartItem): void {
    if (item.qty < item.stock) item.qty++;
  }

  decrease(item: CartItem): void {
    item.qty--;
    if (item.qty <= 0) this.removeItem(item);
  }

  removeItem(item: CartItem): void {
    this.cart = this.cart.filter(i => i.id !== item.id);
  }

  clearCart(): void {
    this.cart = [];
    this.received = 0;
    this.flash('কার্ট খালি করা হয়েছে');
  }

  holdSale(): void {
    if (!this.cart.length) {
      this.flash('Hold করার জন্য আগে পণ্য যোগ করুন');
      return;
    }
    const held: HeldSale = {
      id: Date.now(),
      customer: this.customer,
      items: this.cart.map(i => ({ ...i })),
      total: this.total,
      time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
    };
    this.heldSales.unshift(held);
    localStorage.setItem('hishabai.heldSales', JSON.stringify(this.heldSales));
    this.cart = [];
    this.received = 0;
    this.flash('বিক্রয় Hold করা হয়েছে');
  }

  openPayment(): void {
    if (!this.cart.length) {
      this.flash('পেমেন্টের আগে কার্টে পণ্য যোগ করুন');
      return;
    }
    this.received = this.total;
    this.showPayment = true;
  }

  completeSale(): void {
    if (this.paymentMethod === 'Cash' && Number(this.received) < this.total) {
      this.flash('প্রাপ্ত টাকা মোট বিলের চেয়ে কম');
      return;
    }
    this.lastInvoice = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const soldTotal = this.total;
    this.cart = [];
    this.showPayment = false;
    this.received = 0;
    this.flash(`বিক্রয় সম্পন্ন • ${this.lastInvoice} • ৳${soldTotal.toFixed(2)}`);
  }

  resumeHeldSale(held: HeldSale): void {
    this.cart = held.items.map(i => ({ ...i }));
    this.customer = held.customer;
    this.heldSales = this.heldSales.filter(h => h.id !== held.id);
    localStorage.setItem('hishabai.heldSales', JSON.stringify(this.heldSales));
    this.flash('Hold করা বিক্রয় আবার চালু হয়েছে');
  }

  openHeldSales(): void {
    this.router.navigate(['/pos/held-sales']);
  }

  private loadHeldSales(): void {
    try {
      this.heldSales = JSON.parse(localStorage.getItem('hishabai.heldSales') || '[]');
    } catch {
      this.heldSales = [];
    }
  }

  private flash(text: string): void {
    this.message = text;
    window.setTimeout(() => this.message = '', 2200);
  }

  @HostListener('document:keydown', ['$event'])
  handleShortcuts(event: KeyboardEvent): void {
    if (event.key === 'F2') {
      event.preventDefault();
      document.getElementById('pos-search')?.focus();
    }
    if (event.key === 'F4') {
      event.preventDefault();
      this.holdSale();
    }
    if (event.key === 'F8') {
      event.preventDefault();
      this.openPayment();
    }
    if (event.key === 'Escape') {
      this.showPayment = false;
      this.showCustomerMenu = false;
    }
  }
}
