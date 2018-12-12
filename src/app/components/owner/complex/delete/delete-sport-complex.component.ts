import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteSportComplex } from './delete-sport-complex.actions';
import { SportComplex } from '../../../../models/sport-complex';
import { ShowFlashMessage } from '../../../../actions/flash-message.actions';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';

@Component({
  selector: 'app-delete-sport-complex',
  templateUrl: './delete-sport-complex.component.html',
  styleUrls: ['./delete-sport-complex.component.css']
})
export class DeleteSportComplexComponent implements OnInit {
  @Input() sportComplex: SportComplex;

  FormSubmitType = FormSubmitType;

  sportComplexNameFormControl = new FormControl('');

  constructor(private router: Router, private store: Store) { }

  ngOnInit() {
  }

  isValid(): boolean {
    return this.doesInputMatch();
  }

  onSubmit() {
    const successfulDeletion = () => {
      this.router.navigate(['/owner']);
      this.store.dispatch(new ShowFlashMessage('Kompleks pomyślnie usunięty'));
    };

    this.store.dispatch(new DeleteSportComplex(this.sportComplex.id))
      .subscribe(
        successfulDeletion,
        () => this.store.dispatch(new ShowFlashMessage('Nie można usunąć tego kompleksu sportowego'))
      );
  }

  private doesInputMatch(): boolean {
    return this.sportComplexNameFormControl.value === this.sportComplex.name;
  }

}
