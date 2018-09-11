import { Component, OnInit } from '@angular/core';

import { LocationService } from '../../services/location/location.service';
import { SportObject, Coords } from '../../models/sport-object';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.fetchSportObjects(this.adjustSportObjectData)
      .subscribe(console.log);
  }

  private adjustSportObjectData(data) {
    return data.sport_objects.map((sportObjectData) => {
      return new SportObject(
        sportObjectData.id,
        new Coords(sportObjectData.latitude, sportObjectData.longitude)
      )
    });
  }

}
