import { TestBed } from '@angular/core/testing';

import { IfoodServiceService } from './ifood-service.service';

describe('IfoodServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IfoodServiceService = TestBed.get(IfoodServiceService);
    expect(service).toBeTruthy();
  });
});
