import { Injectable } from '@angular/core';
import { SportObject } from '../models/sport-object';
import { Marker } from '../models/marker';
import { MarkerInfoWindowService } from './marker-info-window.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private readonly infoWindow: google.maps.InfoWindow;

  constructor(private markerInfoWindowService: MarkerInfoWindowService) {
    this.infoWindow = new google.maps.InfoWindow({
      content: ''
    });
  }

  public addMarker(sportObject: any /* sportObject */, map: google.maps.Map): Marker {
    let marker: google.maps.Marker;
    const { latitude, longitude } = sportObject.geo_coordinates;

    marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map
    });

    marker.addListener('click', () => {
      this.infoWindow.setContent(this.markerInfoWindowService.generateInfoWindowContent(sportObject));
      this.infoWindow.open(map, marker);
    });

    return new Marker(marker, this.infoWindow);
  }
}
