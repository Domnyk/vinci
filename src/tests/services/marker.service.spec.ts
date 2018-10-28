import { TestBed } from '@angular/core/testing';

import { MarkerService } from '../../app/services/marker.service';
import { Coords, SportObject} from '../../app/models/sport-object';
import { Marker } from '../../app/models/marker';

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

  /* describe('addMarker', () => {
    xit('should place marker on right position', () => {
      const sportObject: sportObject = new sportObject(1, 'Pływalnia Polonez', new Coords(52.299046, 21.033690 ));

      const { googleMapsMarker }: Marker = service.addMarker(sportObject, map),
            actualMarkerLatitude = googleMapsMarker.getPosition().lat(),
            actualMarkerLongitude = googleMapsMarker.getPosition().lng();

      expect(actualMarkerLatitude).toEqual(sportObject.geoCoordinates.latitude);
      expect(actualMarkerLongitude).toEqual(sportObject.geoCoordinates.longitude);
    });

    // TODO: Think how to test it
    xit('should add event listener to marker', () => {});


    xit('should insert infoWindow', () => {
      const sportObject: sportObject = new sportObject(1, 'Pływalnia Polonez', new Coords(52.299046, 21.033690));

      const { infoWindow }: Marker = service.addMarker(sportObject, map),
            infoWindowContent = infoWindow.getContent();

      expect(infoWindowContent).toContain(sportObject.name);
    });
  }); */
});
