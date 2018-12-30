import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of, zip } from 'rxjs';
import { CurrentLocationService } from '../../../services/current-location.service';
import { MarkerService } from '../../../services/marker.service';
import { Router } from '@angular/router';
import { SportArena } from '../../../models/sport-arena';
import LatLngLiteral = google.maps.LatLngLiteral;
import { SportObject } from '../../../models/sport-object';
import { SearchResult } from '../../../models/search-result';
import { flatMap, map } from 'rxjs/operators';
import { SportObjectState } from '../../../state/sport-object.state';
import { FetchAllObjects } from '../map/map.actions';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Select(state => state.search.params.geoLocation) geoLocation$: Observable<LatLngLiteral>;
  @Select(state => state.search.results) results$: Observable<SearchResult[]>;
  objects$: Observable<SportObject[]>;
  arenas: SportArena[];
  map: google.maps.Map;

  constructor(private currentLocationService: CurrentLocationService,
              private markerService: MarkerService,
              private router: Router,
              private store: Store) {
  }

  ngOnInit() {
    const searchResults$ = this.store.select(state => state.search.results);

    zip(this.geoLocation$, searchResults$, this.store.dispatch(new FetchAllObjects()))
      .subscribe(([location, searchResults, _]: [LatLngLiteral, SearchResult[], Observable<any>]) => this.createMap(location, searchResults));
  }

  handleClick(event) {
    event.preventDefault();

    const sourceElem: string = event.srcElement.id;
    if (!sourceElem.includes('sport-object-info-window')) {
      return;
    }

    const sportObjectId: number = +sourceElem.split('-').pop();
    this.router.navigate([`/objects/${sportObjectId}`]);
  }

  private createMap(currentLocation: LatLngLiteral, searchResults: SearchResult[], ) {
    this.map = new google.maps.Map(document.getElementById('map'), { center: currentLocation, zoom: 15 });
    this.markerService.addMarkerRaw(currentLocation, this.map);
    const ids = searchResults.map(result => result.objectId),
          prices = searchResults.map(result => result.averagePrice),
          maxPrice = Math.max(...prices),
          minPrice = Math.min(...prices);


    this.store.select(SportObjectState.getByIds)
      .pipe(map(filterFn => filterFn(ids)))
      .subscribe((objects: SportObject[]) => {
        objects.forEach(object => {
          const price = searchResults.filter(result => result.objectId === object.id)[0].averagePrice;
          this.markerService.addSearchResultsMarker(object, { min: minPrice, max: maxPrice, value: price } , this.map);
        });
      });
  }
}
