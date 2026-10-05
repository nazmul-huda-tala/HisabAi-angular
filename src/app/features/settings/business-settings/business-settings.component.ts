import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-business-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-settings.component.html',
  styleUrl: './business-settings.component.scss'
})
export class BusinessSettingsComponent {
  activeTab = 'business';
  saved = false;
  message = '';

  settings = this.defaultSettings();

  private defaultSettings() {
    return {
      businessName: 'HisabKhata Demo Store', ownerName: 'Store Owner', phone: '01XXXXXXXXX',
      email: 'demo@hishabai.com', address: 'Dhaka, Bangladesh', currency: 'BDT (৳)',
      invoicePrefix: 'INV-', taxRate: 0, lowStockAlert: 10, autoPrint: false, sound: true,
      lowStockAlerts: true, duePaymentReminder: true, dailySummary: true,
      compactMode: false, darkMode: false
    };
  }

  saveSettings() {
    this.saved = true;
    this.message = '✓ Settings saved successfully';
    setTimeout(() => { this.saved = false; this.message = ''; }, 2200);
  }

  resetSettings() {
    this.settings = this.defaultSettings();
    this.message = 'Settings reset to default values';
    setTimeout(() => this.message = '', 2200);
  }
}
