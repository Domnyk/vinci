import { TestBed } from '@angular/core/testing';

import { CurrentLocationService } from '../app/services/current-location.service';
import LatLngLiteral = google.maps.LatLngLiteral;

describe('CurrentLocationService', () => {
  let service: CurrentLocationService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentLocationService]
    });

    service = TestBed.get(CurrentLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetch', () => {
    const fallbackLocation: LatLngLiteral = { lat: 40.712990, lng: -74.013197 };

    it('should return current geo_location or fallback geo_location when geo_location api is supported', (done: DoneFn) => {
      service.fetch({ fallbackLocation: fallbackLocation }).subscribe(
        location => { expect(location).toEqual(fallbackLocation); done(); },
        () => { fail('Error occurred in CurrentLocationService test'); done(); }
      );
    });
  });
});
