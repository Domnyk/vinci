import { TestBed, inject } from '@angular/core/testing';

import { GeocoderService } from '../../app/services/geocoder.service';

xdescribe('GeocoderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeocoderService]
    });
  });

  it('should be created', inject([GeocoderService], (service: GeocoderService) => {
    expect(service).toBeTruthy();
  }));
});
