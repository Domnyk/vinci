import { Component, OnInit } from '@angular/core';

import { SportObjectService } from '../../../services/sport-object.service';
import { SportObject } from '../../../models/sport-object';

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
  warsaw = { lat: 52.22977, lng: 21.01178 };

  constructor(private sportObjectService: SportObjectService, private currentLocationService: CurrentLocationService,
              private markerService: MarkerService) {}

  ngOnInit() {
    zip(
      this.currentLocationService.fetchCurrentLocation(this.warsaw),
      this.sportObjectService.fetchAll()
    ).subscribe(([currentLocation, sportObjects]) => this.createMap(currentLocation, sportObjects));
  }

  private createMap(currentLocation, sportObjects: Array<SportObject>) {
    this.map = new google.maps.Map(document.getElementById('map'), { center: currentLocation, zoom: 15 });

    sportObjects.forEach(
      sportObject => this.markerService.addMarker(sportObject, this.map));
  }
}
