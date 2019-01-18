import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateNewSportComplex } from './new-sport-complex.actions';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';
import { ComplexForm } from '../../../../models/complex.form';
import { ValidationService } from '../../../../services/validation.service';

@Component({
  selector: 'app-new-sport-complex',
  templateUrl: './new-sport-complex.component.html',
  styleUrls: ['./new-sport-complex.component.css']
})
export class NewSportComplexComponent implements OnInit {
  complex = new ComplexForm(this.validationService);
  FormSubmitType = FormSubmitType;

  constructor(
    private store: Store,
    private validationService: ValidationService
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.store.dispatch(new CreateNewSportComplex(this.complex.dto()));
  }

}
