import { TestBed } from '@angular/core/testing';

import { BusinessContextService } from './business-context.service';

describe('BusinessContextService', () => {
  let service: BusinessContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
