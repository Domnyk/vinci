import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchSportDisciplines } from '../../owner/complex-owner-dashboard/complex-owner-dasboard.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchParams } from '../../../models/search-params';
import { Search } from './search.actions';
import { Router } from '@angular/router';
import { format, lastDayOfMonth } from 'date-fns';
import { months } from './months';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { CurrentLocationService } from '../../../services/current-location.service';
import { warsaw } from '../../../locations';
import { flatMap, tap } from 'rxjs/operators';
import { GeocoderService } from '../../../services/geocoder.service';
import LatLngLiteral = google.maps.LatLngLiteral;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  readonly months: Array<{key: string, value: number}> = months;
  readonly currentDate: CurrentDate;
  readonly lastDayOfMonth: number;
  readonly currentLocationIcon: IconDefinition = faMapMarkerAlt;

  fullLocation: FullLocation = { readableAddress: '', coords: null, wasEditedByUser: true };

  disciplines: FormControl;
  date: FormGroup;
  year: FormControl;
  month: FormControl;
  day: FormControl;
  location: FormControl;

  constructor(private store: Store, private router: Router, private currentLocationService: CurrentLocationService,
              private geocoderService: GeocoderService) {
    const currentDate = new Date(),
          monthOffset = 1,
          zeroBasedMonth = +format(currentDate, 'MM') - monthOffset;

    this.currentDate = {
      year: +format(currentDate, 'YYYY'),
      month: zeroBasedMonth,
      day: +format(currentDate, 'DD')
    };

    this.lastDayOfMonth = +format(lastDayOfMonth(currentDate), 'DD');
    this.year = new FormControl(this.currentDate.year, [
      Validators.required, Validators.min(this.currentDate.year)
    ]);
    this.month = new FormControl(this.months[this.currentDate.month], [Validators.required]);
    this.day = new FormControl(this.currentDate.day, [Validators.required]);
    this.disciplines = new FormControl([], [Validators.required]);
    this.location = new FormControl({ value: this.fullLocation.readableAddress, disabled: false }, [Validators.required]);
    this.location.valueChanges.subscribe((newValue: string) => {
      this.fullLocation.readableAddress = newValue;
    });
  }

  ngOnInit() {
    this.store.dispatch(new FetchSportDisciplines());
  }

  fetchCurrentLocation() {
    this.location.disable();
    this.location.setValue('Proszę czekać...');
    this.currentLocationService.fetch({ fallbackLocation: warsaw })
      .pipe(
        tap( (coords: LatLngLiteral) => this.fullLocation.coords = coords),
        flatMap( (coords: LatLngLiteral) => this.geocoderService.reverseGeocode(coords)),
      )
      .subscribe(this.onSuccessfulLocationFetchHandleControls.bind(this));
  }

  manualEdition() {
    this.fullLocation.wasEditedByUser = true;
  }

  isTouchedOrDirty(control: FormControl) {
    return control.touched || control.dirty;
  }

  isLocationInvalid() {
    return this.location.invalid && this.isTouchedOrDirty(this.location);
  }

  searchForEvents() {
    this.disciplines.markAsTouched({ onlySelf: true });

    const isGeocodingNeeded = this.fullLocation.wasEditedByUser === true;
    if (isGeocodingNeeded) {
      this.geocoderService.geocode(this.fullLocation.readableAddress)
        .pipe(tap( (coords: LatLngLiteral) => this.fullLocation.coords = coords))
        .subscribe(() => this.search());
    } else {
      this.search();
    }
  }

  private search() {
    const day = this.day.value < 10 ? '0' + this.day.value : this.day.value,
          disciplines = this.disciplines.value.map(d => +d),
          date = [this.year.value, this.month.value.value, day].join('-'),
          params = new SearchParams(disciplines, date, this.fullLocation.coords);

    this.store.dispatch(new Search(params));
    this.router.navigate(['search_results']);
  }

  private onSuccessfulLocationFetchHandleControls(readableAddress: string) {
    this.fullLocation.readableAddress = readableAddress;
    this.fullLocation.wasEditedByUser = false;
    this.location.setValue(readableAddress);
    this.location.enable();
  }
}

interface CurrentDate {
  readonly year: number;
  readonly month: number;
  readonly day: number;
}

interface FullLocation {
  readableAddress: string;
  coords: LatLngLiteral;
  wasEditedByUser: boolean;
}
