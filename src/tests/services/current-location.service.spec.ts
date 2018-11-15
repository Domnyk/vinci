import { TestBed } from '@angular/core/testing';

import { CurrentLocationService } from '../../app/services/current-location.service';
import { Coords } from '../../app/models/sport-object';

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
    xit('should return error when location api is not supported', (done: DoneFn) => {
      const fallbackLocation: Coords = new Coords(40.712990, -74.013197);

      service.fetch(fallbackLocation).subscribe(
        () => { fail('Next subscription handler should not get executed'); done(); },
        error => { expect(error).toEqual('Location api not supported'); done(); },
      );
    });

    it('should return current location or fallback location when location api is supported', (done: DoneFn) => {
      const fallbackLocation: Coords = new Coords(40.712990, -74.013197);

      service.fetch(fallbackLocation).subscribe(
        location => { expect(location).toEqual(fallbackLocation); done(); },
        () => { fail('Error occurred in CurrentLocationService test'); done(); }
      );
    });
  });
});
