import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldSalesComponent } from './hold-sales.component';

describe('HoldSalesComponent', () => {
  let component: HoldSalesComponent;
  let fixture: ComponentFixture<HoldSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoldSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoldSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
