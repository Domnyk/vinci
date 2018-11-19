import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const startLaterThanEndValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const startTime = control.get('start'),
        endTime = control.get('end');

  console.log('Start: ', startTime.value, ', end: ', endTime.value);

  return startTime.value > endTime.value ? { 'startLaterThanEnd': true } : null;
};
