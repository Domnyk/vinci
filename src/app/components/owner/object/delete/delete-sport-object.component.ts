import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteSportObject } from './delete-sport-object.actions';
import { SportObject } from '../../../../models/sport-object';
import { ShowFlashMessage } from '../../../../actions/flash-message.actions';

@Component({
  selector: 'app-delete-sport-object',
  templateUrl: './delete-sport-object.component.html',
  styleUrls: []
})
export class DeleteSportObjectComponent {
  @Input() sportObject: SportObject;

  name = new FormControl('');

  constructor(private router: Router, private store: Store) { }

  isInputDifferentFromSportObjectName(): boolean {
    return this.name.value !== this.sportObject.name;
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

}
