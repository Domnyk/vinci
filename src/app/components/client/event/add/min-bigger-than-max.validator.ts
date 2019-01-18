import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const minBiggerThanMaxValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const min = control.get('minParticipants'),
    max = control.get('maxParticipants');

  return min.value > max.value ? { 'minParticipantsBiggerThanMaxParticipants': true } : null;
};
