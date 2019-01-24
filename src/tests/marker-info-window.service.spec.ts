import { TestBed } from '@angular/core/testing';

import { MarkerInfoWindowService } from '../app/services/marker-info-window.service';

describe('MarkerInfoWindowService', () => {
  let service: MarkerInfoWindowService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkerInfoWindowService]
    });

    service = TestBed.get(MarkerInfoWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
