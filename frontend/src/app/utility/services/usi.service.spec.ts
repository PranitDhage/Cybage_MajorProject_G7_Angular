import { TestBed } from '@angular/core/testing';

import { UsiService } from './usi.service';

describe('UsiService', () => {
  let service: UsiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
