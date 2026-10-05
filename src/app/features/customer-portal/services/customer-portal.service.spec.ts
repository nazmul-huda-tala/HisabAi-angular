import { TestBed } from '@angular/core/testing';

import { CustomerPortalService } from './customer-portal.service';

describe('CustomerPortalService', () => {
  let service: CustomerPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
