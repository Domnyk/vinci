import { TestBed, inject } from '@angular/core/testing';

import { CurrentLocationService } from '../app/services/current-location.service';

describe('CurrentLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentLocationService]
    });
  });

  it('should be created', inject([CurrentLocationService], (service: CurrentLocationService) => {
    expect(service).toBeTruthy();
  }));
});
