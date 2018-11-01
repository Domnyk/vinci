import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BookingMargin, SportObject } from '../../../../models/sport-object';
import { Store } from '@ngxs/store';
import { FormControl, Validators } from '@angular/forms';
import { UpdateSportObject } from './edit-sport-object.actions';

@Component({
  selector: 'app-edit-sport-object',
  templateUrl: './edit-sport-object.component.html',
  styleUrls: ['./edit-sport-object.component.css']
})
export class EditSportObjectComponent implements OnChanges {
  @Input() sportObject: SportObject;

  name: FormControl;
  id: FormControl;
  bookingMarginInMonths: FormControl;
  bookingMarginInDays: FormControl;
  street: FormControl;
  buildingNumber: FormControl;
  postalCode: FormControl;
  city: FormControl

  constructor(
    private store: Store
  ) {
    this.name = new FormControl('', [
      Validators.required
    ]);

    this.id = new FormControl('', [
      Validators.required
    ]);

    this.bookingMarginInMonths = new FormControl('', [
      Validators.required
    ]);

    this.bookingMarginInDays = new FormControl('', [
      Validators.required
    ]);

    this.street = new FormControl('', [
      Validators.required
    ]);

    this.buildingNumber = new FormControl('', [

    ]);

    this.postalCode = new FormControl('', [

    ]);

    this.city = new FormControl('', [

    ]);
  }

  ngOnChanges(changes: SimpleChanges) {
    const sportObject = changes.sportObject.currentValue;

    console.debug('sportObject is: ', sportObject);

    this.name.setValue(sportObject.name);
    this.id.setValue(sportObject.id);
    this.bookingMarginInMonths.setValue(sportObject.bookingMargin.months);
    this.bookingMarginInDays.setValue(sportObject.bookingMargin.days);
    this.street.setValue(sportObject.address.street);
    this.buildingNumber.setValue(sportObject.address.buildingNumber);
    this.postalCode.setValue(sportObject.address.postalCode);
    this.city.setValue(sportObject.address.city);
  }

  onSubmit() {
    const bookingMargin: BookingMargin = {
        months: this.bookingMarginInMonths.value,
        days: this.bookingMarginInDays.value,
        seconds: 0
    }, address = {
        street: this.street.value,
        buildingNumber: this.buildingNumber.value,
        postalCode: this.postalCode.value,
        city: this.city.value
    }, sportObject = new SportObject(this.id.value, this.name.value, address, this.sportObject.geoCoordinates, bookingMargin, this.sportObject.sportComplexId);

    this.store.dispatch(new UpdateSportObject(sportObject));
  }

}
