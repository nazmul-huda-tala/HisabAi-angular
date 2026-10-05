import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDueComponent } from './customer-due.component';

describe('CustomerDueComponent', () => {
  let component: CustomerDueComponent;
  let fixture: ComponentFixture<CustomerDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
