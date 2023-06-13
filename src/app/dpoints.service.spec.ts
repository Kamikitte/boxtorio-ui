import { TestBed } from '@angular/core/testing';

import { DpointsService } from './dpoints.service';

describe('DpointsService', () => {
  let service: DpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
