import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { SportDiscipline } from '../../../../models/sport-discipline';
import { FormControl, Validators } from '@angular/forms';
import { SportArena } from '../../../../models/sport-arena';
import { CreateSportArena } from './new-sport-arena.actions';
import { SelectParams } from '../../../common/form-field/select-params';
import { flatMap } from 'rxjs/operators';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';

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

  FormSubmitType = FormSubmitType;

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

  public get selectParams(): Observable<SelectParams> {
    return this.sportDisciplines$.pipe(
      flatMap((sportDisciplines: SportDiscipline[]) => of(
        sportDisciplines.map(sd => ({ label: sd.name, value: sd.id }))
      )),
      flatMap((selectOptions) => of({ isMultiple: true, id: 'test', options: selectOptions })));
  }
}
