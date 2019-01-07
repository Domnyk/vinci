import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteSportComplex } from './delete-sport-complex.actions';
import { ComplexFormModel } from '../form-model/complex-form-model';
import { ShowFlashMessageOnSuccessfulOperation } from '../../../../actions/flash-message.actions';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';
import { SportComplexState } from '../../../../state/sport-complex.state';
import { map } from 'rxjs/operators';
import { Complex } from '../../../../models/complex';

@Component({
  selector: 'app-delete-sport-complex',
  templateUrl: './delete-sport-complex.component.html',
  styleUrls: ['./delete-sport-complex.component.css']
})
export class DeleteSportComplexComponent implements OnChanges {
  @Input() complexId: number;
  FormSubmitType = FormSubmitType;
  complex: ComplexFormModel = null;
  areNamesEqual: () => boolean;

  constructor(private router: Router, private store: Store) { }

  ngOnChanges() {
    this.store.select(SportComplexState.getById)
      .pipe(map(filterFn => filterFn(this.complexId)))
      .subscribe((complex: Complex) => this.initFormData(complex));
  }

  isValid(): boolean {
    return this.complex.isValid() && this.areNamesEqual();
  }

  onSubmit() {
    const successfulDeletion = () => {
      this.router.navigate(['/owner']);
      this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Kompleks pomyślnie usunięty'));
    };

    this.store.dispatch(new DeleteSportComplex(this.complex.id))
      .subscribe(
        successfulDeletion,
        () => this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Nie można usunąć tego kompleksu sportowego'))
      );
  }

  private initFormData(complex: Complex) {
    this.complex = new ComplexFormModel('', complex.id);
    this.areNamesEqual = (): boolean => {
      return this.complex.name.value === complex.name;
    };
  }

}
