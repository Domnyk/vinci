import { Component, OnInit } from '@angular/core';
import { ComplexFormModel } from '../form-model/complex-form-model';
import { Store } from '@ngxs/store';
import { CreateNewSportComplex } from './new-sport-complex.actions';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';
import { Complex } from '../../../../models/complex';

@Component({
  selector: 'app-new-sport-complex',
  templateUrl: './new-sport-complex.component.html',
  styleUrls: ['./new-sport-complex.component.css']
})
export class NewSportComplexComponent implements OnInit {
  complexFormModel: ComplexFormModel;
  FormSubmitType = FormSubmitType;

  constructor(
    private store: Store,
  ) {
    this.complexFormModel = new ComplexFormModel();
  }

  ngOnInit() { }

  onSubmit() {
    const complex = new Complex(this.complexFormModel.id.value, this.complexFormModel.name.value);
    this.store.dispatch(new CreateNewSportComplex(complex));
  }

}
