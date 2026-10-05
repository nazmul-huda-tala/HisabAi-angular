import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SecondaryMetric {
  label: string;
  value: string;
  note: string;
  iconType: 'purchase' | 'due' | 'stock';
  tone: 'accent' | 'warning' | 'danger';
}

interface RecentSale {
  invoice: string;
  customer: string;
  time: string;
  amount: string;
  status: 'পরিশোধিত' | 'বাকি আছে';
}

const BANGLA_DIGITS: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
};

function toBanglaDigits(input: string): string {
  return input.replace(/[0-9]/g, (d) => BANGLA_DIGITS[d]);
}

function formatTaka(amount: number): string {
  const whole = Math.round(amount).toString();
  const lastThree = whole.length > 3 ? whole.slice(-3) : whole;
  const rest = whole.length > 3 ? whole.slice(0, -3) : '';
  const grouped = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree : lastThree;
  return `৳ ${toBanglaDigits(grouped)}`;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly todaySalesValue = 12450;
  readonly salesGrowthLabel = 'গতকালের চেয়ে ১২% বেশি';

  readonly animatedSalesLabel = signal(formatTaka(0));

  readonly weekSeries = [18, 24, 16, 32, 26, 38, 29];
  readonly weekDayLabels = ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র'];

  hoveredIndex = signal<number | null>(null);

  readonly secondaryMetrics: SecondaryMetric[] = [
    { label: 'আজকের ক্রয়', value: '৳ ৬,৮২০', note: '৩টি নতুন ক্রয়', iconType: 'purchase', tone: 'accent' },
    { label: 'মোট বাকি আদায়যোগ্য', value: '৳ ৮,৫৪০', note: '১২ জন কাস্টমার', iconType: 'due', tone: 'warning' },
    { label: 'লো-স্টক পণ্য', value: '০৮', note: 'রিভিউ করা প্রয়োজন', iconType: 'stock', tone: 'danger' },
  ];

  readonly quickActions = [
    { label: 'নতুন বিক্রয় (POS)', route: '/pos', actionType: 'pos' },
    { label: 'পণ্য যোগ করুন', route: '/products/new', actionType: 'product' },
    { label: 'নতুন ক্রয়', route: '/purchases/new', actionType: 'purchase' },
    { label: 'খরচ যোগ করুন', route: '/expenses/new', actionType: 'expense' },
  ];

  readonly recentSales: RecentSale[] = [
    { invoice: 'INV-১০৪৮', customer: 'রহিম স্টোর', time: '১১:৪২ AM', amount: '৳ ২,৩৫০', status: 'পরিশোধিত' },
    { invoice: 'INV-১০৪৭', customer: 'করিম ট্রেডার্স', time: '১১:১০ AM', amount: '৳ ৮৯০', status: 'বাকি আছে' },
    { invoice: 'INV-১০৪৬', customer: 'ওয়াক-ইন কাস্টমার', time: '১০:৪৫ AM', amount: '৳ ৪২০', status: 'পরিশোধিত' },
    { invoice: 'INV-১০৪৫', customer: 'নিউ বাজার এন্টারপ্রাইজ', time: '১০:০২ AM', amount: '৳ ৩,১৯০', status: 'পরিশোধিত' },
  ];

  ngOnInit(): void {
    this.animateHeroNumber();
  }

  private animateHeroNumber(): void {
    const duration = 1000;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.animatedSalesLabel.set(formatTaka(this.todaySalesValue * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  get sparklinePoints(): string {
    return this.weekSeries
      .map((_, i) => this.pointAt(i))
      .map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`)
      .join(' ');
  }

  get areaPoints(): string {
    const points = this.weekSeries
      .map((_, i) => this.pointAt(i))
      .map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`)
      .join(' ');
    return `0,40 ${points} 100,40`;
  }

  get activePoint(): { x: number; y: number; val: number } {
    const idx = this.hoveredIndex() ?? (this.weekSeries.length - 1);
    const pt = this.pointAt(idx);
    return { ...pt, val: this.weekSeries[idx] };
  }

  setHoverIndex(index: number | null): void {
    this.hoveredIndex.set(index);
  }

  private pointAt(index: number): { x: number; y: number } {
    const max = Math.max(...this.weekSeries);
    const min = Math.min(...this.weekSeries) * 0.8;
    const range = max - min || 1;
    const width = 100;
    const height = 40;
    const step = width / (this.weekSeries.length - 1);
    const value = this.weekSeries[index];
    return { x: index * step, y: height - ((value - min) / range) * height };
  }
}