import { TestBed, inject } from '@angular/core/testing';

import { MarkerInfoWindowService } from './marker-info-window.service';

describe('MarkerInfoWindowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkerInfoWindowService]
    });
  });

  it('should be created', inject([MarkerInfoWindowService], (service: MarkerInfoWindowService) => {
    expect(service).toBeTruthy();
  }));
});
