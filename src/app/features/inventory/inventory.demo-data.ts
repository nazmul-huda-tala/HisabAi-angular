import { InventoryItem, StockMovement } from './models/inventory.model';

/**
 * TEMPORARY static demo data for the Inventory module.
 * Replace with InventoryService (backed by ApiService/HttpClient) once the
 * backend Inventory endpoints are wired up.
 */
export const DEMO_STOCK_ITEMS: InventoryItem[] = [
  { id: 1, name: 'Fresh Soybean Oil 1L', sku: 'GRC-0001', category: 'মুদি পণ্য', unit: 'pcs', currentStock: 42, reorderLevel: 10, unitCost: 150, unitPrice: 168 },
  { id: 2, name: 'ACI Pure Salt 1kg', sku: 'GRC-0002', category: 'মুদি পণ্য', unit: 'pcs', currentStock: 12, reorderLevel: 15, unitCost: 28, unitPrice: 32 },
  { id: 3, name: 'Dettol Soap 75g', sku: 'PC-0003', category: 'প্রসাধনী', unit: 'pcs', currentStock: 0, reorderLevel: 12, unitCost: 32, unitPrice: 38 },
  { id: 4, name: 'Pran Chanachur 200g', sku: 'GRC-0004', category: 'মুদি পণ্য', unit: 'pcs', currentStock: 65, reorderLevel: 20, unitCost: 45, unitPrice: 55 },
  { id: 5, name: 'Coca-Cola 500ml', sku: 'BEV-0005', category: 'পানীয়', unit: 'pcs', currentStock: 8, reorderLevel: 24, unitCost: 35, unitPrice: 45 },
  { id: 6, name: 'Nescafé Classic 50g', sku: 'BEV-0006', category: 'পানীয়', unit: 'pcs', currentStock: 30, reorderLevel: 10, unitCost: 220, unitPrice: 260 },
  { id: 7, name: 'Colgate Toothpaste 100g', sku: 'PC-0007', category: 'প্রসাধনী', unit: 'pcs', currentStock: 3, reorderLevel: 15, unitCost: 60, unitPrice: 75 },
  { id: 8, name: 'Basmati Rice 5kg', sku: 'GRC-0008', category: 'মুদি পণ্য', unit: 'bag', currentStock: 22, reorderLevel: 8, unitCost: 620, unitPrice: 690 },
  { id: 9, name: 'Surf Excel 1kg', sku: 'HH-0009', category: 'গৃহস্থালি', unit: 'pcs', currentStock: 0, reorderLevel: 10, unitCost: 190, unitPrice: 215 },
  { id: 10, name: 'Exercise Notebook 96pg', sku: 'STN-0010', category: 'স্টেশনারি', unit: 'pcs', currentStock: 140, reorderLevel: 30, unitCost: 22, unitPrice: 30 },
  { id: 11, name: 'Fresh Milk Powder 500g', sku: 'GRC-0011', category: 'মুদি পণ্য', unit: 'pcs', currentStock: 18, reorderLevel: 12, unitCost: 340, unitPrice: 380 },
  { id: 12, name: 'Lifebuoy Hand Wash 200ml', sku: 'PC-0012', category: 'প্রসাধনী', unit: 'pcs', currentStock: 55, reorderLevel: 15, unitCost: 95, unitPrice: 115 },
];

export const DEMO_STOCK_MOVEMENTS: StockMovement[] = [
  { id: 1, date: '2026-09-01', productId: 2, productName: 'ACI Pure Salt 1kg', sku: 'GRC-0002', type: 'purchase', direction: 'in', quantity: 40, balanceAfter: 52, reference: 'PUR-1042' },
  { id: 2, date: '2026-09-02', productId: 5, productName: 'Coca-Cola 500ml', sku: 'BEV-0005', type: 'sale', direction: 'out', quantity: 20, balanceAfter: 28, reference: 'INV-3311' },
  { id: 3, date: '2026-09-03', productId: 3, productName: 'Dettol Soap 75g', sku: 'PC-0003', type: 'sale', direction: 'out', quantity: 12, balanceAfter: 0, reference: 'INV-3325' },
  { id: 4, date: '2026-09-03', productId: 7, productName: 'Colgate Toothpaste 100g', sku: 'PC-0007', type: 'sale', direction: 'out', quantity: 10, balanceAfter: 5, reference: 'INV-3326' },
  { id: 5, date: '2026-09-04', productId: 9, productName: 'Surf Excel 1kg', sku: 'HH-0009', type: 'sale', direction: 'out', quantity: 10, balanceAfter: 0, reference: 'INV-3340' },
  { id: 6, date: '2026-09-05', productId: 1, productName: 'Fresh Soybean Oil 1L', sku: 'GRC-0001', type: 'purchase', direction: 'in', quantity: 30, balanceAfter: 60, reference: 'PUR-1050' },
  { id: 7, date: '2026-09-06', productId: 1, productName: 'Fresh Soybean Oil 1L', sku: 'GRC-0001', type: 'sale', direction: 'out', quantity: 18, balanceAfter: 42, reference: 'INV-3355' },
  { id: 8, date: '2026-09-06', productId: 5, productName: 'Coca-Cola 500ml', sku: 'BEV-0005', type: 'sale', direction: 'out', quantity: 10, balanceAfter: 18, reference: 'INV-3360' },
  { id: 9, date: '2026-09-07', productId: 7, productName: 'Colgate Toothpaste 100g', sku: 'PC-0007', type: 'adjustment', direction: 'out', quantity: 2, balanceAfter: 3, reference: 'ADJ-2001', reason: 'damage', note: 'বাক্স ভেজা ছিল, ২টি নষ্ট' },
  { id: 10, date: '2026-09-07', productId: 2, productName: 'ACI Pure Salt 1kg', sku: 'GRC-0002', type: 'adjustment', direction: 'out', quantity: 3, balanceAfter: 12, reference: 'ADJ-2002', reason: 'counting-error', note: 'গণনায় গরমিল পাওয়া গেছে' },
  { id: 11, date: '2026-09-08', productId: 8, productName: 'Basmati Rice 5kg', sku: 'GRC-0008', type: 'purchase', direction: 'in', quantity: 20, balanceAfter: 22, reference: 'PUR-1061' },
  { id: 12, date: '2026-09-08', productId: 11, productName: 'Fresh Milk Powder 500g', sku: 'GRC-0011', type: 'purchase', direction: 'in', quantity: 10, balanceAfter: 18, reference: 'PUR-1075' },
  { id: 13, date: '2026-09-10', productId: 4, productName: 'Pran Chanachur 200g', sku: 'GRC-0004', type: 'sale', direction: 'out', quantity: 25, balanceAfter: 65, reference: 'INV-3390' },
  { id: 14, date: '2026-09-11', productId: 12, productName: 'Lifebuoy Hand Wash 200ml', sku: 'PC-0012', type: 'return', direction: 'in', quantity: 5, balanceAfter: 55, reference: 'RET-0090', note: 'গ্রাহক ফেরত দিয়েছেন' },
  { id: 15, date: '2026-09-12', productId: 6, productName: 'Nescafé Classic 50g', sku: 'BEV-0006', type: 'purchase', direction: 'in', quantity: 15, balanceAfter: 30, reference: 'PUR-1090' },
  { id: 16, date: '2026-09-13', productId: 10, productName: 'Exercise Notebook 96pg', sku: 'STN-0010', type: 'transfer', direction: 'in', quantity: 50, balanceAfter: 140, reference: 'TRF-0021', note: 'মিরপুর শাখা থেকে ট্রান্সফার' },
  { id: 17, date: '2026-09-13', productId: 9, productName: 'Surf Excel 1kg', sku: 'HH-0009', type: 'adjustment', direction: 'out', quantity: 2, balanceAfter: 0, reference: 'ADJ-2003', reason: 'expired', note: 'মেয়াদ শেষ হওয়ায় বাদ দেওয়া হয়েছে' },
];
