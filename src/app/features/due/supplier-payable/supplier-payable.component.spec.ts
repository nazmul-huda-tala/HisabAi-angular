import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPayableComponent } from './supplier-payable.component';

describe('SupplierPayableComponent', () => {
  let component: SupplierPayableComponent;
  let fixture: ComponentFixture<SupplierPayableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierPayableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
