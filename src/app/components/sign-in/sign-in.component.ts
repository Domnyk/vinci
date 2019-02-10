import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SignInWithPassword } from '../../actions/sign-in.actions';

import { Credentials } from '../../models/credentials';
import { environment } from '../../../environments/environment.dev';
import { FormControl, Validators } from '@angular/forms';
import { FormSubmitType } from '../common/form-submit-button/form-submit-type';
import { CurrentUserType } from '../../models/current-user-type';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  backendSignInAddress = environment.api.urls.signIn();

  FormSubmitType = FormSubmitType;
  email: FormControl;
  password: FormControl;

  constructor(private router: Router, private store: Store) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
  }

  ngOnInit() {}

  onSubmit(): void {
    const credentials: Credentials = new Credentials(this.email.value, this.password.value);

    this.store.dispatch(new SignInWithPassword(credentials));
  }

  isFormValid(): boolean {
    return this.email.valid && this.password.valid;
  }

  // Test
  testId: FormControl = new FormControl(0);
  get backendSignInAddressDev(): string {
    return environment.api.urls.signIn(CurrentUserType.Client, this.testId.value);
  }


}
