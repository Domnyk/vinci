import { TestBed } from '@angular/core/testing';

import { MarkerService } from '../../app/services/marker.service';;

// TODO: Add Google Maps mock: https://github.com/ScottieR/angular-google-maps-mock
xdescribe('MarkerService', () => {
  const map: any = {};
  let service: MarkerService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkerService]
    });

    service = TestBed.get(MarkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
