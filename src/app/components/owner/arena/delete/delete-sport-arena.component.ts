import { Component, Input, OnInit } from '@angular/core';
import { SportArena } from '../../../../models/sport-arena';
import { FormControl, Validators } from '@angular/forms';
import { ShowFlashMessage } from '../../../../actions/flash-message.actions';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteSportArena } from './delete-sport-arena.actions';

@Component({
  selector: 'app-delete-sport-arena',
  templateUrl: './delete-sport-arena.component.html',
  styleUrls: ['./delete-sport-arena.component.css']
})
export class DeleteSportArenaComponent implements OnInit {
  @Input() sportArena: SportArena;

  name: FormControl;

  constructor(private router: Router, private store: Store) {
    this.name = new FormControl('', [
      Validators.required
    ]);
  }

  ngOnInit() {
  }

  isInputDifferentFromSportArenaName(): boolean {
    return this.name.value !== this.sportArena.name;
  }

  onSubmit() {
    const successfulDeletion = () => {
      this.router.navigate(['/owner']);
      this.store.dispatch(new ShowFlashMessage('Arena pomyślnie usunięta'));
    };

    this.store.dispatch(new DeleteSportArena(this.sportArena.id))
      .subscribe(
        successfulDeletion,
        () => this.store.dispatch(new ShowFlashMessage('Nie można usunąć tej areny sportowej'))
      );
  }
}
