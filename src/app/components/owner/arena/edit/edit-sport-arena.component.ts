import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SportArena } from '../../../../models/sport-arena';
import { FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SportDiscipline } from '../../../../models/sport-discipline';
import { UpdateSportArena } from './edit-sport-arena.actions';

@Component({
  selector: 'app-edit-sport-arena',
  templateUrl: './edit-sport-arena.component.html',
  styleUrls: ['./edit-sport-arena.component.css']
})
export class EditSportArenaComponent implements OnInit, OnChanges {
  @Input() sportArena: SportArena;
  @Select(state => state.sportDisciplines) allSportDisciplines$: Observable<SportDiscipline[]>;

  name: FormControl;
  sportDisciplines: FormControl;

  constructor(private store: Store) {
    this.name = new FormControl('', [
      Validators.required
    ]);

    this.sportDisciplines = new FormControl([], [
      Validators.required
    ]);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const sportArena: SportArena = changes.sportArena.currentValue;
    console.debug('ngOnChanges fired in edit sport arena component. sportArena is: ', sportArena);

    this.name.setValue(sportArena.name);
    this.sportDisciplines.setValue(sportArena.sportDisciplines);
  }

  onSubmit() {
    const sportDisciplines: Array<number> = this.sportDisciplines.value.map((id: string) => +id),
          sportArena: SportArena = new SportArena(this.sportArena.id, this.name.value, sportDisciplines,
                                                  this.sportArena.sportObjectId);

    this.store.dispatch(new UpdateSportArena(sportArena));
  }

}
