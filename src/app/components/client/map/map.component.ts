import { Component, OnInit } from '@angular/core';
import { SportObject } from '../../../models/sport-object';

import { CurrentLocationService } from '../../../services/current-location.service';
import { MarkerService } from '../../../services/marker.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FetchAllObjects } from './map.actions';
import { Select, Store } from '@ngxs/store';
import { warsaw } from '../../../locations';
import LatLngLiteral = google.maps.LatLngLiteral;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Select(state => state.SportObjects) sportObjects$: Observable<SportObject[]>;
  map: google.maps.Map;

  constructor(private currentLocationService: CurrentLocationService, private markerService: MarkerService,
              private router: Router, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new FetchAllObjects);
    this.currentLocationService.fetch({ fallbackLocation: warsaw })
      .subscribe((currentLocation) => this.createMap(currentLocation));
  }

  handleClick(event) {
    console.debug('Source elem id: ', event.srcElement.id);
    event.preventDefault();

    const sourceElem: string = event.srcElement.id;
    if (!sourceElem.includes('sport-object-info-window')) {
      return;
    }

    const sportObjectId: number = +sourceElem.split('-').pop();
    this.router.navigate([`/objects/${sportObjectId}`]);
  }

  private createMap(currentLocation: LatLngLiteral) {
    this.map = new google.maps.Map(document.getElementById('map'), { center: currentLocation, zoom: 15 });

    this.sportObjects$.subscribe((sportObjects: SportObject[]) => {
      sportObjects.forEach(sportObject => this.markerService.addMarker(sportObject, this.map));
    });
  }
}
