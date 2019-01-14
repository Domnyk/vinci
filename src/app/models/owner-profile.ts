import { FormControl, Validators } from '@angular/forms';
import { DTO } from '../interfaces/dto';

export class OwnerProfile implements DTO {
  id: number = null;
  email = new FormControl('', [Validators.required, Validators.email]);
  isSameEmailForPaypal = new FormControl(true, [Validators.required]);
  paypalEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor({ id, email, paypalEmail }: OwnerProfileData) {
    this.id = id;
    this.email.setValue(email);
    this.paypalEmail.setValue(paypalEmail);

    this.isSameEmailForPaypal.setValue(email === paypalEmail);
  }

  isValid(): boolean {
    return[this.email.valid, this.isSameEmailForPaypal.valid, this.paypalEmail.valid]
      .reduce((prev, curr) => prev && curr, true);
  }

  dto(): OwnerProfileDataDTO {
    return {
      id: this.id,
      email: this.email.value,
      paypal_email: this.paypalEmail.value
    };
  }
}

export interface OwnerProfileDataDTO {
  id: number;
  email: string;
  paypal_email: string;
}

export interface OwnerProfileData {
  id: number;
  email: string;
  paypalEmail: string;
}
