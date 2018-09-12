import {Component, OnInit} from '@angular/core';

import {LocationService} from '../../services/location/location.service';
import {SportObject} from '../../models/sport-object';

import {CurrentLocationService} from '../../services/current-location/current-location.service';
import { Observable, concat } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  sportObjects: Array<SportObject> = null;
  map: google.maps.Map;

  constructor(private locationService: LocationService, private currentLocationService: CurrentLocationService) {}

  ngOnInit() {
    this.locationService.fetchSportObjects()
       .subscribe();

    this.createMap();
  }

  private createMap() {
    function initMapWithClientCoords(clientLocation) {
      this.map = new google.maps.Map(document.getElementById('map'), {center: clientLocation, zoom: 20});
    }

    function initMapWithDefaultCoords() {
      const london = {lat: 51.509865, lng: -0.118092};
      this.map = new google.maps.Map(document.getElementById('map'), {center: london, zoom: 20});
    }

    this.currentLocationService.fetchCurrentLocation()
      .subscribe(initMapWithClientCoords, initMapWithDefaultCoords);
  }
}
