import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteSportObject } from './delete-sport-object.actions';
import { SportObject } from '../../../../models/sport-object';
import { ShowFlashMessageOnSuccessfulOperation } from '../../../../actions/flash-message.actions';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';
import { SportArenaState } from '../../../../state/sport-arena.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-delete-sport-object',
  templateUrl: './delete-sport-object.component.html',
  styleUrls: []
})
export class DeleteSportObjectComponent implements OnChanges {
  @Input() sportObject: SportObject;

  name = new FormControl('');
  hasAnyArenas = true;

  FormSubmitType = FormSubmitType;

  constructor(private router: Router, private store: Store) { }

  ngOnChanges() {
    this.store.select(SportArenaState.sportArenasInSportObject)
      .pipe(map(filterFn => filterFn(this.sportObject.id)))
      .subscribe(arenas => arenas.length > 0 ? this.hasAnyArenas = true : this.hasAnyArenas = false);
  }

  isFormValid(): boolean {
    return this.doesInputMatch() && !this.hasAnyArenas;
  }

  onSubmit() {
    const successfulDeletion = () => {
      this.router.navigate(['/owner']);
      this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Obiekt pomyślnie usunięty'));
    };

    this.store.dispatch(new DeleteSportObject(this.sportObject.id))
      .subscribe(
        successfulDeletion,
        () => this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Nie można usunąć tego obiektu sportowego'))
      );
  }

  private doesInputMatch(): boolean {
    return this.name.value === this.sportObject.name;
  }

}
