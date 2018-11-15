import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SearchResults } from '../../../state/search-results.state';
import { CurrentLocationService } from '../../../services/current-location.service';
import { Coords, SportObject } from '../../../models/sport-object';
import { MarkerService } from '../../../services/marker.service';
import { Router } from '@angular/router';
import { SportArena } from '../../../models/sport-arena';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  readonly warsaw: Coords;

  @Select(state => state.searchResults) searchResults$: Observable<SearchResults>;
  arenas: SportArena[];
  map: google.maps.Map;

  constructor(private currentLocationService: CurrentLocationService,
              private markerService: MarkerService,
              private router: Router) {
    this.warsaw = new Coords(52.22977, 21.01178);
  }

  ngOnInit() {
    this.currentLocationService.fetch(this.warsaw)
      .subscribe((currentLocation: Coords) => this.createMap(currentLocation));
  }

  handleClick(event) {
    event.preventDefault();

    const sourceElem: string = event.srcElement.id;
    if (!sourceElem.includes('sport-object-info-window')) {
      return;
    }

    const sportObjectId: number = +sourceElem.split('-').pop(),
          foundArenasIds = this.arenas
            .map(arena => `${arena.id}`)
            .join(',');
    this.router.navigate([`/objects/${sportObjectId}`, { found: foundArenasIds }]);
  }

  private createMap(currentLocation: Coords) {
    this.map = new google.maps.Map(document.getElementById('map'), { center: currentLocation.asGoogleCoords, zoom: 15 });

    this.searchResults$.subscribe(({ objects, arenas }) => {
      this.arenas = arenas;
      objects.forEach(object => this.markerService.addMarker(object, this.map));
    });
  }
}
