import { FormControl, Validators } from '@angular/forms';
import { DTO } from './dto';

export class ClientProfile implements DTO {
  id: number = null;
  email = new FormControl('', [Validators.required, Validators.email]);
  displayName = new FormControl('', [Validators.required]);
  isSameEmailForPaypal = new FormControl(true, [Validators.required]);
  paypalEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor({ email, displayName, isSameEmailForPaypal, paypalEmail, id }: ProfileData) {
    this.email.setValue(email);
    this.displayName.setValue(displayName);
    this.isSameEmailForPaypal.setValue(isSameEmailForPaypal);
    this.paypalEmail.setValue(paypalEmail);
    this.id = id;
  }

  isValid(): boolean {
    return[this.email.valid, this.displayName.valid, this.isSameEmailForPaypal.valid, this.paypalEmail.valid]
      .reduce((prev, curr) => prev && curr, true);
  }

  dto(): ProfileDataDTO {
    return {
      id: this.id,
      email: this.email.value,
      display_name: this.displayName.value,
      paypal_email: this.paypalEmail.value
    };
  }
}

export interface ProfileDataDTO {
  id: number;
  email: string;
  display_name: string;
  paypal_email: string;
}

export interface ProfileData {
  email?: string;
  displayName?: string;
  isSameEmailForPaypal?: boolean;
  paypalEmail?: string;
  id?: number;
}
