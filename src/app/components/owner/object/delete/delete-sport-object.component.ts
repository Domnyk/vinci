import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteSportObject } from './delete-sport-object.actions';
import { SportObject } from '../../../../models/sport-object';
import { ShowFlashMessage } from '../../../../actions/flash-message.actions';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';

@Component({
  selector: 'app-delete-sport-object',
  templateUrl: './delete-sport-object.component.html',
  styleUrls: []
})
export class DeleteSportObjectComponent {
  @Input() sportObject: SportObject;

  name = new FormControl('');

  FormSubmitType = FormSubmitType;

  constructor(private router: Router, private store: Store) { }

  isFormValid(): boolean {
    return this.doesInputMatch();
  }

  onSubmit() {
    const successfulDeletion = () => {
      this.router.navigate(['/owner']);
      this.store.dispatch(new ShowFlashMessage('Obiekt pomyślnie usunięty'));
    };

    this.store.dispatch(new DeleteSportObject(this.sportObject.id))
      .subscribe(
        successfulDeletion,
        () => this.store.dispatch(new ShowFlashMessage('Nie można usunąć tego obiektu sportowego'))
      );
  }

  private doesInputMatch(): boolean {
    return this.name.value === this.sportObject.name;
  }

}
