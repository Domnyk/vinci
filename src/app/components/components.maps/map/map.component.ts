import { Component, OnInit } from '@angular/core';

import { SportObjectService } from '../../../services/sport-object.service';
import {Coords, SportObject} from '../../../models/sport-object';

import { CurrentLocationService } from '../../../services/current-location.service';
import { MarkerService } from '../../../services/marker.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: google.maps.Map;
  warsaw: Coords = new Coords(52.22977, 21.01178);

  constructor(private sportObjectService: SportObjectService, private currentLocationService: CurrentLocationService,
              private markerService: MarkerService) {}

  ngOnInit() {
    zip(
      this.currentLocationService.fetchCurrentLocation(this.warsaw),
      this.sportObjectService.fetchAll()
    ).subscribe(([currentLocation, sportObjects]) => this.createMap(currentLocation, sportObjects));
  }

  private createMap(currentLocation: Coords, sportObjects: Array<SportObject>) {
    console.log('sport objects are: ', sportObjects);

    this.map = new google.maps.Map(document.getElementById('map'), { center: currentLocation.asGoogleCoords, zoom: 15 });

    sportObjects.forEach(
      sportObject => this.markerService.addMarker(sportObject, this.map));
  }
}
