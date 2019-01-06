import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '../../helpers/form.helper';
import { passwordMatchConfirmationValidator } from './password-validators';
import { Store } from '@ngxs/store';
import { SignUpComplexesOwner } from '../../actions/user.actions';
import { ComplexesOwner } from '../../models/complexes-owner';
import { FormSubmitType } from '../common/form-submit-button/form-submit-type';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  FormHelper = FormHelper;
  FormSubmitType = FormSubmitType;
  complexesOwner = new ComplexesOwner();

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onSubmit() {
    this.store.dispatch(new SignUpComplexesOwner(this.complexesOwner));
  }
}
