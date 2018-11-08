import { AbstractControl, ValidatorFn } from '@angular/forms';
import { parse } from 'date-fns';

export function customDateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return validateDate(control);
  };
}

function validateDate(control: AbstractControl): {[key: string]: any} | null {
  const dateField: string = control.value,
        fullDateLength = 10,
        invalidValue: {[key: string]: any} = { 'invalidDate': { value: dateField } },
        validValue = null;

  if (dateField.length < fullDateLength) {
    return invalidValue;
  }

  if (dateField.length > fullDateLength) {
    return invalidValue;
  }

  const iso8601Date: string = dateField
    .split('.')
    .reverse()
    .join('-');

  try {
    parse(iso8601Date, { additionalDigits: 2 });
    return validValue;
  } catch (error) {
    return invalidValue;
  }
}
