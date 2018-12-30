import { Injectable } from '@angular/core';
import { SportObject } from '../models/sport-object';
import { Marker } from '../models/marker';
import { MarkerInfoWindowService } from './marker-info-window.service';
import { Select, Store } from '@ngxs/store';
import { SportArenaState } from '../state/sport-arena.state';
import { Observable } from 'rxjs';
import { map as map_ } from 'rxjs/operators';
import LatLngLiteral = google.maps.LatLngLiteral;
import { Rgb } from '../models/colors';
import { ColorService } from './color.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private readonly infoWindow: google.maps.InfoWindow;

  constructor(private markerInfoWindowService: MarkerInfoWindowService, private store: Store,
              private colorService: ColorService) {
    this.infoWindow = new google.maps.InfoWindow({
      content: ''
    });
  }

  public addMarker(sportObject: SportObject, map: google.maps.Map): Marker {
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

  public addMarkerRaw(coordinates: LatLngLiteral, map: google.maps.Map): Marker {
    const marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      icon: 'https://img.icons8.com/ios-glyphs/30/000000/define-location.png'
    });

    return new Marker(marker, this.infoWindow);
  }

  private calculateMarkerColor(min: number, max: number, value: number): Rgb {
    const green: Rgb = { r: 0, g: 255, b: 0 },
          red: Rgb = { r: 255, g: 0, b: 0 },
          val = (max - value) / (max - min),
          color = this.colorService.interpolate(green, red, (max - value) / (max - min));

    console.log(color);
    return color;
  }

  public addSearchResultsMarker(sportObject: SportObject, { min, max, value }: { min: number, max: number, value: number } , map: google.maps.Map): Marker {
    const color = this.calculateMarkerColor(min, max, value),
          marker = new google.maps.Marker({
            position: sportObject.geoCoordinates,
            map: map,
            icon: this.createPinSymbol(color)
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

  private createPinSymbol(color: Rgb): google.maps.Symbol {
    return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
      fillOpacity: 1,
      fillColor: ColorService.getRgbString(color),
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 1
    };
  }

}
