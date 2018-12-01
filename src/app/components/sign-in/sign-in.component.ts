import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SignInWithPassword } from '../../actions/sign-in.actions';

import { Credentials } from '../../models/credentials';
import { environment } from '../../../environments/environment.generated.dev';
import { FormControl, Validators } from '@angular/forms';
import { FormHelper } from '../../helpers/form.helper';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  backendSignInAddress = environment.api.urls.signIn();
  FormHelper = FormHelper;
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

  isSubmitDisabled(): boolean {
    return this.email.invalid || this.password.invalid;
  }


}
