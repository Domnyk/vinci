import { TestBed, inject } from '@angular/core/testing';

import { SportObjectService } from './sport-object.service';

describe('SportObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SportObjectService]
    });
  });

  it('should be created', inject([SportObjectService], (service: SportObjectService) => {
    expect(service).toBeTruthy();
  }));
});
