import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchConfirmationValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password'),
        passwordConfirmation = control.get('passwordConfirmation');

  return password.value !== passwordConfirmation.value ? { 'passwordDoesNotMatchConfirmation': true } : null;
};


