export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  brand: string;
  unit: string;
  /** Average purchase/cost price per unit. */
  costPrice: number;
  /** Current selling price per unit. */
  salePrice: number;
  /** Opening/current stock quantity (kept in sync with Inventory module later). */
  stock: number;
  reorderLevel: number;
  taxRate: number;
  status: ProductStatus;
  description: string;
  imageColor: string;
  /** Product photo URL (falls back to a generated placeholder if empty). */
  imageUrl?: string;
}

/** Generates a stable placeholder product photo from the product name + brand color, used until real photos are uploaded. */
export function productImageUrl(label: string, bgColor: string): string {
  const bg = bgColor.replace('#', '');
  return `https://placehold.co/300x300/${bg}/3f2d12?font=noto-sans&text=${encodeURIComponent(label)}`;
}

export const PRODUCT_CATEGORIES = ['মুদি', 'দৈনন্দিন', 'স্ন্যাকস', 'পানীয়', 'গৃহস্থালি', 'প্রসাধনী', 'ইলেকট্রনিক্স'] as const;
export const PRODUCT_UNITS = ['পিস', 'কেজি', 'গ্রাম', 'লিটার', 'প্যাক', 'বক্স', 'ডজন'] as const;
export const PRODUCT_BRANDS = ['জেনেরিক', 'আকিজ', 'প্রাণ', 'স্কয়ার', 'ফ্রেশ', 'ACI', 'Unilever'] as const;

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
};
