import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SportComplex } from '../../../../models/sport-complex';
import { Store } from '@ngxs/store';
import { FormControl, Validators } from '@angular/forms';
import { UpdateSportComplex } from './edit-sport-complex.actions';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';

@Component({
  selector: 'app-edit-sport-complex',
  templateUrl: './edit-sport-complex.component.html',
  styleUrls: ['./edit-sport-complex.component.css']
})
export class EditSportComplexComponent implements OnChanges {
  @Input() sportComplexInput: SportComplex;

  FormSubmitType = FormSubmitType;

  name: FormControl;
  id: FormControl;

  constructor(
    private store: Store
  ) {
    this.name = new FormControl('', [
      Validators.required
    ]);
  }

  ngOnChanges(changes: SimpleChanges) {
    const sportComplex = changes.sportComplexInput.currentValue;

    this.name.setValue(sportComplex.name);
  }

  // TODO: How conveniently connect form controls with model?
  onSubmit() {
    const sportComplex = new SportComplex(this.name.value, this.sportComplexInput.id);
    this.store.dispatch(new UpdateSportComplex(sportComplex));
  }

}
