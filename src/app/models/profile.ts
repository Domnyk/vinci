import { FormControl, Validators } from '@angular/forms';

export class ClientProfile {
  email = new FormControl('', [Validators.required, Validators.email]);
  displayName = new FormControl('', [Validators.required]);
  isSameEmailForPaypal = new FormControl(true, [Validators.required]);
  paypalEmail = new FormControl('', [Validators.required]);

  constructor({ email, displayName, isSameEmailForPaypal, paypalEmail}: ProfileData) {
    this.email.setValue(email);
    this.displayName.setValue(displayName);
    this.isSameEmailForPaypal.setValue(isSameEmailForPaypal);
    this.paypalEmail.setValue(paypalEmail);
  }
}

export interface ProfileData {
  email?: string;
  displayName?: string;
  isSameEmailForPaypal?: boolean;
  paypalEmail?: string;
}
