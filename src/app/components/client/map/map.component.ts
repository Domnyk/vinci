import { Component, EventEmitter, OnInit } from '@angular/core';
import {Coords, SportObject} from '../../../models/sport-object';

import { CurrentLocationService } from '../../../services/current-location.service';
import { MarkerService } from '../../../services/marker.service';
import { Observable, zip } from 'rxjs';
import {EntityService} from '../../../services/entity.service';
import { Router } from '@angular/router';
import { FetchAllObjects } from './map.actions';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Select(state => state.SportObjects) sportObjects$: Observable<SportObject[]>;

  map: google.maps.Map;
  warsaw: Coords = new Coords(52.22977, 21.01178);

  constructor(private sportObjectService: EntityService<SportObject>, private currentLocationService: CurrentLocationService,
              private markerService: MarkerService, private router: Router, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new FetchAllObjects);
    this.currentLocationService.fetchCurrentLocation(this.warsaw)
      .subscribe((currentLocation) => this.createMap(currentLocation));
  }

  handleClick(event) {
    event.preventDefault();
    const sourceElemId: string = event.path[0].id;
    if (!sourceElemId.includes('sport-object-info-window')) {
      return;
    }

    const sportObjectId: number = +sourceElemId.split('-').pop();
    this.router.navigate([`/objects/${sportObjectId}`]);
  }

  private createMap(currentLocation: Coords) {
    this.map = new google.maps.Map(document.getElementById('map'), { center: currentLocation.asGoogleCoords, zoom: 15 });

    this.sportObjects$.subscribe((sportObjects: SportObject[]) => {
      sportObjects.forEach(sportObject => this.markerService.addMarker(sportObject, this.map));
    });
  }
}