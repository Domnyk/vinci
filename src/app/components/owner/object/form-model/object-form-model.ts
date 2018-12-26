import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Validator } from '../../../../interfaces/validator';
import { ObjectFormModelConstructorParams } from './object-form-model-constructor-params';
import LatLngLiteral = google.maps.LatLngLiteral;

export class ObjectFormModel implements Validator {
  id: number = null;
  complexId: number = null;
  geoCoordinates: LatLngLiteral = null;
  name = new FormControl('', [Validators.required]);
  bookingMarginInMonths: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  bookingMarginInDays: FormControl = new FormControl(1, [Validators.required, Validators.min(0)]);
  street: FormControl = new FormControl('', [Validators.required]);
  buildingNumber = new FormControl('', [Validators.required, buildingNumberValidator()]);
  postalCode: FormControl = new FormControl('', [Validators.required, postalCodeValidator()]);
  city: FormControl = new FormControl('', [Validators.required]);

  isValid(): boolean {
    const controls = [this.name, this.bookingMarginInMonths, this.bookingMarginInDays, this.street, this.buildingNumber,
      this.postalCode, this.city];

    return controls.reduce((prev, curr) => prev && curr.valid, true);
  }

  constructor(params: ObjectFormModelConstructorParams = null) {
    if (!!params) {
      const { id, complexId, name, bookingMarginInMonths, bookingMarginInDays, buildingNumber, city, street,
              postalCode, geoCoordinates } = params;
      this.id = id;
      this.complexId = complexId;
      this.geoCoordinates = geoCoordinates;
      this.name.setValue(name);
      this.bookingMarginInMonths.setValue(bookingMarginInMonths);
      this.bookingMarginInDays.setValue(bookingMarginInDays);
      this.buildingNumber.setValue(buildingNumber);
      this.city.setValue(city);
      this.postalCode.setValue(postalCode);
      this.street.setValue(street);
    }
  }
}

function postalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const postalCodeRegExp: RegExp = /^[0-9]{2}-[0-9]{3}$/,
          properPostalCode = postalCodeRegExp.test(control.value);

    return properPostalCode ? null : { 'invalidPostalCode' : { value: control.value } };
  };
}

function buildingNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const buildingNumberRegExp = /^\d{1,2}(\/\d{1,2})?$/,
          properBuildingNumber = buildingNumberRegExp.test(control.value);

    return properBuildingNumber ? null : { 'invalidBuildingNumber' : { value: control.value } };
  };
}
