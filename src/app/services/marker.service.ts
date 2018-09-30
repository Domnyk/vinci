import { Injectable } from '@angular/core';
import { SportObject } from '../models/sport-object';
import { Marker } from '../models/marker';
import { MarkerInfoWindowService } from './marker-info-window.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  constructor(private markerInfoWindowService: MarkerInfoWindowService) { }

  public addMarker(sportObject: any /* SportObject */, map: google.maps.Map): Marker {
    let marker: google.maps.Marker,
        infoWindow: google.maps.InfoWindow;
    const { latitude, longitude } = sportObject.geo_coordinates;

    marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map
    });

    infoWindow = new google.maps.InfoWindow({
      content: this.markerInfoWindowService.generateInfoWindowContent(sportObject)
    });

    marker.addListener('click', () => infoWindow.open(map, marker));

    return new Marker(marker, infoWindow);
  }
}
