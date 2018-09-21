import { TestBed } from '@angular/core/testing';

import { MarkerService } from '../app/services/marker.service';
import { SportObject } from '../app/models/sport-object';
import { Marker } from '../app/models/marker';

// TODO: Add Google Maps mock: https://github.com/ScottieR/angular-google-maps-mock
describe('MarkerService', () => {
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

  describe('addMarker', () => {
    it('should place marker on right position', () => {
      const sportObject: SportObject = new SportObject(1, 'Pływalnia Polonez', { latitude: 52.299046, longitude: 21.033690 });

      const { googleMapsMarker }: Marker = service.addMarker(sportObject, map),
            actualMarkerLatitude = googleMapsMarker.getPosition().lat(),
            actualMarkerLongitude = googleMapsMarker.getPosition().lng();

      expect(actualMarkerLatitude).toEqual(sportObject.geo_coordinates.latitude);
      expect(actualMarkerLongitude).toEqual(sportObject.geo_coordinates.longitude);
    });

    // TODO: Think how to test it
    it('should add event listener to marker', () => {});


    it('should insert infoWindow', () => {
      const sportObject: SportObject = new SportObject(1, 'Pływalnia Polonez', { latitude: 52.299046, longitude: 21.033690 });

      const { infoWindow }: Marker = service.addMarker(sportObject, map),
            infoWindowContent = infoWindow.getContent();

      expect(infoWindowContent).toContain(sportObject.name);
    });
  });
});
