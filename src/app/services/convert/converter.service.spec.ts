import { TestBed } from '@angular/core/testing';

import { ConvertService } from './convert.service';

describe('ConverterService', () => {
  let service: ConvertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
