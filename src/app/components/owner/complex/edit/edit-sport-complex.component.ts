import { Component, Input, OnChanges } from '@angular/core';
import { Store } from '@ngxs/store';
import { UpdateSportComplex } from './edit-sport-complex.actions';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';
import { ComplexFormModel } from '../form-model/complex-form-model';
import { SportComplexState } from '../../../../state/sport-complex.state';
import { map } from 'rxjs/operators';
import { Complex } from '../../../../models/complex';

@Component({
  selector: 'app-edit-sport-complex',
  templateUrl: './edit-sport-complex.component.html',
  styleUrls: ['./edit-sport-complex.component.css']
})
export class EditSportComplexComponent implements OnChanges {
  @Input() complexId: number;
  FormSubmitType = FormSubmitType;
  complex: ComplexFormModel = null;

  constructor(private store: Store) { }

  ngOnChanges() {
    this.store.select(SportComplexState.getById)
      .pipe(map(filterFn => filterFn(this.complexId)))
      .subscribe((complex: Complex) => this.initFormData(complex));
  }

  onSubmit() {
    const complex = new Complex(this.complex.id.value, this.complex.name.value);
    this.store.dispatch(new UpdateSportComplex(complex));
  }

  private initFormData(complex: Complex) {
    this.complex = new ComplexFormModel(complex.name, complex.id);
  }
}
