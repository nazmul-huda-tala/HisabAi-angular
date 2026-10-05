import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickProductsComponent } from './quick-products.component';

describe('QuickProductsComponent', () => {
  let component: QuickProductsComponent;
  let fixture: ComponentFixture<QuickProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
