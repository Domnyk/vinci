import { Component, Input, OnChanges } from '@angular/core';
import { BookingMargin, SportObject } from '../../../../models/sport-object';
import { Store } from '@ngxs/store';
import { UpdateSportObject } from './edit-sport-object.actions';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';
import { map } from 'rxjs/operators';
import { SportObjectState } from '../../../../state/sport-object.state';
import { ObjectFormModel } from '../form-model/object-form-model';

@Component({
  selector: 'app-edit-sport-object',
  templateUrl: './edit-sport-object.component.html',
  styleUrls: ['./edit-sport-object.component.css']
})
export class EditSportObjectComponent implements OnChanges {
  @Input() objectId: number;
  object: ObjectFormModel = null;

  FormSubmitType = FormSubmitType;

  constructor(private store: Store) { }

  ngOnChanges() {
    this.store.select(SportObjectState.getById)
      .pipe(map(filterFn => filterFn(this.objectId)))
      .subscribe((object: SportObject) => this.initFormData(object));
  }

  editObject() {
    const bookingMargin: BookingMargin = {
        months: this.object.bookingMarginInMonths.value,
        days: this.object.bookingMarginInDays.value,
        seconds: 0
    }, address = {
        street: this.object.street.value,
        buildingNumber: this.object.buildingNumber.value,
        postalCode: this.object.postalCode.value,
        city: this.object.city.value
    }, params = { id: this.object.id, name: this.object.name.value, address: address,
                  geoCoordinates: this.object.geoCoordinates, bookingMargin: bookingMargin,
                  complexId: this.object.complexId  },
       object = new SportObject(params);

    this.store.dispatch(new UpdateSportObject(object));
  }

  private initFormData({ id, name, address, bookingMargin, complexId, geoCoordinates }: SportObject) {
    const params: ObjectFormModelConstructorParams = {
      id: id,
      complexId: complexId,
      name: name,
      bookingMarginInMonths: bookingMargin.months,
      bookingMarginInDays: bookingMargin.days,
      street: address.street,
      buildingNumber: address.buildingNumber,
      postalCode: address.postalCode,
      city: address.city,
      geoCoordinates: geoCoordinates
    };

    this.object = new ObjectFormModel(params);
  }

}
