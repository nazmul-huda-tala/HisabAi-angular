import { Component, Input } from '@angular/core';

export type IconName =
  | 'home' | 'cart' | 'box' | 'user' | 'truck' | 'arrow-down' | 'layers'
  | 'arrow-up-right' | 'taka' | 'minus' | 'bar-chart' | 'settings'
  | 'menu' | 'x' | 'search' | 'bell' | 'chevron-down' | 'help-circle' | 'plus'
  | 'phone' | 'map-pin' | 'arrow-left' | 'chevron-left' | 'chevron-right' | 'edit-2' | 'file-text' | 'check'
  | 'alert-triangle' | 'trending-up' | 'trending-down' | 'clipboard'
  | 'log-out' | 'shield' | 'image' | 'mail' | 'star' | 'lock' | 'package';

/**
 * Single-stroke line icon set (20x20, currentColor) so the whole app shares
 * one consistent icon language instead of mismatched emoji/glyphs.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (name) {
        @case ('home') {
          <path d="M3 9.5 10 3l7 6.5" /><path d="M5 8.5V17h10V8.5" />
        }
        @case ('cart') {
          <path d="M3 3h2l1.6 9.6a2 2 0 0 0 2 1.7h6a2 2 0 0 0 2-1.6L18 6.5H5.3" />
          <circle cx="8.5" cy="17" r="1.2" /><circle cx="15" cy="17" r="1.2" />
        }
        @case ('box') {
          <path d="M3 6.5 10 3l7 3.5-7 3.5-7-3.5Z" /><path d="M3 6.5V14l7 3.5 7-3.5V6.5" /><path d="M10 10v7.5" />
        }
        @case ('user') {
          <circle cx="10" cy="6.5" r="3.2" /><path d="M3.5 17c1-3.3 3.7-5 6.5-5s5.5 1.7 6.5 5" />
        }
        @case ('truck') {
          <path d="M2 6h9v8H2z" /><path d="M11 9h4l3 3v2h-7" /><circle cx="6" cy="16" r="1.4" /><circle cx="14.5" cy="16" r="1.4" />
        }
        @case ('arrow-down') {
          <path d="M10 3v13" /><path d="M5 11l5 5 5-5" />
        }
        @case ('layers') {
          <path d="M10 3 2.5 7 10 11l7.5-4L10 3Z" /><path d="M2.5 11 10 15l7.5-4" /><path d="M2.5 14.5 10 18.5l7.5-4" />
        }
        @case ('arrow-up-right') {
          <path d="M6 14 14 6" /><path d="M7.5 6H14v6.5" />
        }
        @case ('taka') {
          <path d="M8 3v13" /><path d="M6 8h6" /><path d="M8 13.5c0 1.5 1.2 2.5 2.6 2.5A4 4 0 0 0 14 14" /><path d="M5 5h6" />
        }
        @case ('minus') {
          <path d="M4 10h12" />
        }
        @case ('plus') {
          <path d="M10 4v12" /><path d="M4 10h12" />
        }
        @case ('bar-chart') {
          <path d="M4 17V10" /><path d="M10 17V3" /><path d="M16 17v-6" />
        }
        @case ('settings') {
          <circle cx="10" cy="10" r="2.6" />
          <path d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4M15.3 15.3l-1.4-1.4M6.1 6.1 4.7 4.7" />
        }
        @case ('menu') {
          <path d="M3 6h14" /><path d="M3 10h14" /><path d="M3 14h14" />
        }
        @case ('x') {
          <path d="M5 5l10 10" /><path d="M15 5 5 15" />
        }
        @case ('search') {
          <circle cx="9" cy="9" r="5.5" /><path d="M17 17l-3.8-3.8" />
        }
        @case ('bell') {
          <path d="M5 8.5a5 5 0 0 1 10 0c0 3.5 1 4.5 1 4.5H4s1-1 1-4.5Z" /><path d="M8.3 15.5a1.8 1.8 0 0 0 3.4 0" />
        }
        @case ('chevron-down') {
          <path d="M5 7.5 10 12.5 15 7.5" />
        }
        @case ('chevron-left') {
          <path d="M12.5 5 7.5 10l5 5" />
        }
        @case ('chevron-right') {
          <path d="M7.5 5 12.5 10l-5 5" />
        }
        @case ('help-circle') {
          <circle cx="10" cy="10" r="7.2" /><path d="M7.8 7.8a2.2 2.2 0 1 1 3.3 2c-.9.6-1.1 1-1.1 1.9" /><circle cx="10" cy="14" r=".15" fill="currentColor" />
        }
        @case ('phone') {
          <path d="M4.5 3.2h2.1c.4 0 .8.3.9.7l.7 2.6a1 1 0 0 1-.3 1L6.8 8.6a10.6 10.6 0 0 0 4.6 4.6l1.1-1.1a1 1 0 0 1 1-.3l2.6.7c.4.1.7.5.7.9v2.1c0 .6-.5 1-1 1C9.9 16.5 3.5 10.1 3.5 4.2c0-.5.4-1 1-1Z" />
        }
        @case ('map-pin') {
          <path d="M10 18s5.5-5.3 5.5-9.5a5.5 5.5 0 1 0-11 0C4.5 12.7 10 18 10 18Z" /><circle cx="10" cy="8.3" r="2" />
        }
        @case ('arrow-left') {
          <path d="M16 10H4" /><path d="M9 5l-5 5 5 5" />
        }
        @case ('edit-2') {
          <path d="M12.8 3.3a1.5 1.5 0 0 1 2.1 2.1L6 14.3l-3 .8.8-3 8.9-8.9Z" />
        }
        @case ('file-text') {
          <path d="M6.2 2.5h5.1l3.2 3.2v11.3a1 1 0 0 1-1 1H6.2a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" /><path d="M11.3 2.5v3.2h3.2" /><path d="M7 10.5h6M7 13.5h6" />
        }
        @case ('check') {
          <path d="M4 10.3 8 14l8-8.5" />
        }
        @case ('alert-triangle') {
          <path d="M10 3.4 2.3 16.5h15.4L10 3.4Z" /><path d="M10 8.2v3.6" /><circle cx="10" cy="14" r=".15" fill="currentColor" />
        }
        @case ('trending-up') {
          <path d="M3 14.5 8 9.5l3 3 6-6" /><path d="M13.2 6.3h3.8v3.8" />
        }
        @case ('trending-down') {
          <path d="M3 6 8 11l3-3 6 6" /><path d="M13.2 14h3.8v-3.8" />
        }
        @case ('clipboard') {
          <path d="M7.2 3.8h5.6a1 1 0 0 1 1 1v.6H15a1.5 1.5 0 0 1 1.5 1.5v8.6A1.5 1.5 0 0 1 15 17H5a1.5 1.5 0 0 1-1.5-1.5V6.9A1.5 1.5 0 0 1 5 5.4h1.2v-.6a1 1 0 0 1 1-1Z" /><path d="M7.5 9.5h5M7.5 12.5h5" />
        }
        @case ('log-out') {
          <path d="M8 17H4.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1H8" /><path d="M13 14l4-4-4-4" /><path d="M17 10H7.5" />
        }
        @case ('shield') {
          <path d="M10 2.7 16.5 5v5c0 4.3-3 6.9-6.5 8.3C6.5 16.9 3.5 14.3 3.5 10V5L10 2.7Z" /><path d="M7.3 9.8l2 2 3.4-4" />
        }
        @case ('image') {
          <path d="M3.5 4.5h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" /><circle cx="7.2" cy="8.2" r="1.4" /><path d="M3.5 14 8 10l2.5 2.3L14 9l3 3.6" />
        }
        @case ('mail') {
          <path d="M3.5 5h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /><path d="M3.7 5.8l6.3 5 6.3-5" />
        }
        @case ('star') {
          <path d="M10 2.8l2.1 4.5 4.9.6-3.6 3.4.9 4.8-4.3-2.4-4.3 2.4.9-4.8-3.6-3.4 4.9-.6 2.1-4.5Z" />
        }
        @case ('lock') {
          <rect x="4.5" y="9" width="11" height="8" rx="1.2" /><path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" />
        }
        @case ('package') {
          <path d="M3 6.5 10 3l7 3.5-7 3.5-7-3.5Z" /><path d="M3 6.5V14l7 3.5 7-3.5V6.5" /><path d="M10 10v7.5" /><path d="M6.5 5 13.5 8.5" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 18;
}
