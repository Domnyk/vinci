import { Injectable } from '@angular/core';
import { SportObject } from '../models/sport-object';
import { Marker } from '../models/marker';
import { MarkerInfoWindowService } from './marker-info-window.service';
import { Select, Store } from '@ngxs/store';
import { SportArenaState } from '../state/sport-arena.state';
import { Observable } from 'rxjs';
import { map as map_ } from 'rxjs/operators';

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
    console.debug('sportObject is: ', sportObject);

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
}
