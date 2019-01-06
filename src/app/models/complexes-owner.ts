import { DTO } from '../interfaces/dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchConfirmationValidator } from '../components/sign-up/password-validators';

export class ComplexesOwner implements DTO {
  private static readonly passwordMinLength = 8;
  private static readonly passwordRegExp = /\d[a-z][A-Z][\W_]/;

  email = new FormControl('', [Validators.required, Validators.email]);
  paypalEmail = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(ComplexesOwner.passwordMinLength),
                                  Validators.pattern(ComplexesOwner.passwordRegExp)]);
  passwordConfirmation = new FormControl('', [Validators.required]);
  passwordGroup = new FormGroup({
    'password': this.password,
    'passwordConfirmation': this.passwordConfirmation
  }, { validators: passwordMatchConfirmationValidator });

  passwordReq = 'Hasło musi zawierać przynajmnie ' + ComplexesOwner.passwordMinLength + ' znaków w tym cyfrę, małą literę, dużą literę i znak specjalny';

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
