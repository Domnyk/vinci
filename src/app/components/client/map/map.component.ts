import { Component, EventEmitter, OnInit } from '@angular/core';
import {Coords, SportObject} from '../../../models/sport-object';

import { CurrentLocationService } from '../../../services/current-location.service';
import { MarkerService } from '../../../services/marker.service';
import { zip } from 'rxjs';
import {EntityService} from '../../../services/entity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: google.maps.Map;
  warsaw: Coords = new Coords(52.22977, 21.01178);

  constructor(private sportObjectService: EntityService<SportObject>, private currentLocationService: CurrentLocationService,
              private markerService: MarkerService, private router: Router) {}

  ngOnInit() {
    zip(
      this.currentLocationService.fetchCurrentLocation(this.warsaw),
      this.sportObjectService.fetchAll('sport_objects'),
    ).subscribe(([currentLocation, sportObjects]) => this.createMap(currentLocation, sportObjects));
  }

  handleClick(event) {
    event.preventDefault();
    const sourceElemId: string = event.path[0].id;
    if (!sourceElemId.includes('sport-object-info-window')) {
      return;
    }

    const sportObjectId: number = +sourceElemId.split('-').pop();
    this.router.navigate([`/owner/object/${sportObjectId}`]);
  }

  private createMap(currentLocation: Coords, sportObjects: any /* Array<sportObject> */) {
    console.log('sport objects are: ', sportObjects);

    this.map = new google.maps.Map(document.getElementById('map'), { center: currentLocation.asGoogleCoords, zoom: 15 });

    sportObjects.sport_objects.forEach(
      sportObject => {
        console.log(sportObject);
        this.markerService.addMarker(sportObject, this.map);
      });
  }
}
