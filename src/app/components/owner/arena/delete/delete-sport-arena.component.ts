import { Component, Input, OnInit } from '@angular/core';
import { SportArena } from '../../../../models/sport-arena';
import { FormControl, Validators } from '@angular/forms';
import { ShowFlashMessageOnSuccessfulOperation } from '../../../../actions/flash-message.actions';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteSportArena } from './delete-sport-arena.actions';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';

@Component({
  selector: 'app-delete-sport-arena',
  templateUrl: './delete-sport-arena.component.html',
  styleUrls: ['./delete-sport-arena.component.css']
})
export class DeleteSportArenaComponent implements OnInit {
  @Input() sportArena: SportArena;

  name: FormControl;

  FormSubmitType = FormSubmitType;

  constructor(private router: Router, private store: Store) {
    this.name = new FormControl('', [
      Validators.required
    ]);
  }

  ngOnInit() {
  }

  isFormValid(): boolean {
    return this.doesInputMatch();
  }


  onSubmit() {
    const successfulDeletion = () => {
      this.router.navigate(['/owner']);
      this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Arena pomyślnie usunięta'));
    };

    this.store.dispatch(new DeleteSportArena(this.sportArena.id))
      .subscribe(
        successfulDeletion,
        () => this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Nie można usunąć tej areny sportowej'))
      );
  }

  private doesInputMatch(): boolean {
    return this.name.value === this.sportArena.name;
  }
}
