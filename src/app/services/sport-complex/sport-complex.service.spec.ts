import { TestBed, inject } from '@angular/core/testing';

import { SportComplexService } from './sport-complex.service';

describe('SportComplexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SportComplexService]
    });
  });

  it('should be created', inject([SportComplexService], (service: SportComplexService) => {
    expect(service).toBeTruthy();
  }));
});
