import { TestBed } from '@angular/core/testing';

import { BenfordService } from './benford.service';

describe('BenfordService', () => {
  let service: BenfordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenfordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
