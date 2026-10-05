import { Injectable, signal } from '@angular/core';

/**
 * Small signal-based UI state shared between the top navbar (hamburger)
 * and the main layout (mobile sidebar drawer). No NgRx needed for this scale.
 */
@Injectable({ providedIn: 'root' })
export class LayoutUiService {
  private _sidebarOpen = signal(false);
  private _sidebarCollapsed = signal(false);

  readonly sidebarOpen = this._sidebarOpen.asReadonly();
  readonly sidebarCollapsed = this._sidebarCollapsed.asReadonly();

  toggleSidebar(): void {
    this._sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this._sidebarOpen.set(false);
  }

  toggleSidebarCollapse(): void {
    this._sidebarCollapsed.update((collapsed) => !collapsed);
  }
}
