import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SportDiscipline } from '../../../../models/sport-discipline';
import { FormControl, Validators } from '@angular/forms';
import { SportArena } from '../../../../models/sport-arena';
import { CreateSportArena } from './new-sport-arena.actions';

@Component({
  selector: 'app-new-sport-arena',
  templateUrl: './new-sport-arena.component.html',
  styleUrls: ['./new-sport-arena.component.css']
})
export class NewSportArenaComponent implements OnInit {
  @Input() sportObjectId: number;
  @Select(state => state.sportDisciplines) sportDisciplines$: Observable<SportDiscipline[]>;

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

  onSubmit() {
    const sportDisciplines: Array<number> = this.sportDisciplines.value.map((sportDiscipline: string) => +sportDiscipline),
          sportArena = new SportArena(null, this.name.value, sportDisciplines, this.sportObjectId);

    console.debug('sportArena: ', sportArena);

    this.store.dispatch(new CreateSportArena(sportArena));
  }
}
