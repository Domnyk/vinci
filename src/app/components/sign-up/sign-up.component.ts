import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '../../helpers/form.helper';
import { passwordMatchConfirmationValidator } from './password-match-confirmation.directive';
import { Store } from '@ngxs/store';
import { SignUpComplexesOwner } from '../../actions/user.actions';
import { ComplexesOwner } from '../../models/complexes-owner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  FormHelper = FormHelper;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;
  passwordGroup: FormGroup;

  constructor(private store: Store) { }

  ngOnInit() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.passwordConfirmation = new FormControl('', [Validators.required]);
    this.passwordGroup = new FormGroup({
      'password': this.password,
      'passwordConfirmation': this.passwordConfirmation
    }, { validators: passwordMatchConfirmationValidator });
  }

  onSubmit() {
    const newComplexesOwner = new ComplexesOwner(this.email.value, this.password.value);
    this.store.dispatch(new SignUpComplexesOwner(newComplexesOwner));
  }

  isSubmitDisabled(): boolean {
    return this.email.invalid || this.password.invalid || this.passwordConfirmation.invalid
      || this.passwordGroup.invalid;
  }
}
