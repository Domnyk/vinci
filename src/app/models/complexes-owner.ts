import { DTO } from '../interfaces/dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchConfirmationValidator } from '../components/sign-up/password-match-confirmation.directive';

export class ComplexesOwner implements DTO {
  email = new FormControl('', [Validators.required, Validators.email]);
  paypalEmail = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  passwordConfirmation = new FormControl('', [Validators.required]);
  passwordGroup = new FormGroup({
    'password': this.password,
    'passwordConfirmation': this.passwordConfirmation
  }, { validators: passwordMatchConfirmationValidator });

  constructor() { }

  get isValid(): boolean {
    return [this.email.valid, this.password.valid, this.passwordConfirmation.valid, this.paypalEmail.valid,
      this.passwordGroup.valid]
      .reduce((prev, curr) => prev && curr, true);
  }

  dto(): SportComplexDTO {
    return {
      email: this.email.value,
      paypal_email: this.paypalEmail.value,
      password: this.password.value
    };
  }
}

export interface SportComplexDTO {
  email: string;
  paypal_email: string;
  password: string;
}
