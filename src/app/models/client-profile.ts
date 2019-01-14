import { FormControl, Validators } from '@angular/forms';
import { DTO } from '../interfaces/dto';

export class ClientProfile implements DTO {
  id: number = null;
  paypalEmail = new FormControl('', [Validators.required, Validators.email]);
  displayName = new FormControl('', [Validators.required]);

  constructor({ displayName, paypalEmail, id }: ClientProfileData) {
    this.displayName.setValue(displayName);
    this.paypalEmail.setValue(paypalEmail);
    this.id = id;
  }

  isValid(): boolean {
    return [this.displayName.valid, this.paypalEmail.valid]
      .reduce((prev, curr) => prev && curr, true);
  }

  dto(): ClientProfileDataDTO {
    return {
      id: this.id,
      display_name: this.displayName.value,
      paypal_email: this.paypalEmail.value
    };
  }
}

export interface ClientProfileDataDTO {
  id: number;
  display_name: string;
  paypal_email: string;
}

export interface ClientProfileData {
  id: number;
  displayName: string;
  paypalEmail: string;
}
