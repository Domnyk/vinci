import { Injectable } from '@angular/core';
import { SportObject } from '../models/sport-object';
import { Marker } from '../models/marker';
import { MarkerInfoWindowService } from './marker-info-window.service';
import { Select, Store } from '@ngxs/store';
import { SportArenaState } from '../state/sport-arena.state';
import { Observable } from 'rxjs';
import { map as map_ } from 'rxjs/operators';
import LatLngLiteral = google.maps.LatLngLiteral;

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private readonly infoWindow: google.maps.InfoWindow;

  constructor(private markerInfoWindowService: MarkerInfoWindowService, private store: Store) {
    this.infoWindow = new google.maps.InfoWindow({
      content: ''
    });
  }

  public addMarker(sportObject: SportObject, map: google.maps.Map): Marker {
    const marker = new google.maps.Marker({
      position: sportObject.geoCoordinates,
      map: map
    });

    marker.addListener('click', () => {
      this.store.select(SportArenaState.disciplinesInObject).pipe(
        map_(filterFn => filterFn(sportObject.id))
      ).subscribe((disciplines: string[]) => {
        this.infoWindow.setContent(this.markerInfoWindowService.generateInfoWindowContent(sportObject, disciplines));
        this.infoWindow.open(map, marker);
      });
    });

    return new Marker(marker, this.infoWindow);
  }

  public addMarkerRaw(coordinates: LatLngLiteral, map: google.maps.Map): Marker {
    const marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      icon: 'https://img.icons8.com/ios-glyphs/30/000000/define-location.png'
    });

    return new Marker(marker, this.infoWindow);
  }
}
