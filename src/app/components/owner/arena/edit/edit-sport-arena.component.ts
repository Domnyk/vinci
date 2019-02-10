import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SportArena } from '../../../../models/sport-arena';
import { FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { SportDiscipline } from '../../../../models/sport-discipline';
import { UpdateSportArena } from './edit-sport-arena.actions';
import { SelectParams } from '../../../common/form-field/select-params';
import { flatMap } from 'rxjs/operators';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';

@Component({
  selector: 'app-edit-sport-arena',
  templateUrl: './edit-sport-arena.component.html',
  styleUrls: ['./edit-sport-arena.component.css']
})
export class EditSportArenaComponent implements OnInit, OnChanges {
  @Input() sportArena: SportArena;
  @Select(state => state.sportDisciplines) allSportDisciplines$: Observable<SportDiscipline[]>;

  FormSubmitType = FormSubmitType;

  name: FormControl;
  sportDisciplines: FormControl;
  pricePerHour: FormControl = new FormControl(1, [Validators.required, Validators.min(1)]);

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

    this.name.setValue(sportArena.name);
    this.sportDisciplines.setValue(sportArena.sportDisciplines);
    this.pricePerHour.setValue(sportArena.pricePerHour);
  }

  onSubmit() {
    const sportDisciplines: Array<number> = this.sportDisciplines.value.map((id: string) => +id),
          sportArena: SportArena = new SportArena(this.sportArena.id, this.name.value, sportDisciplines,
                                                  this.sportArena.sportObjectId, +this.pricePerHour.value);

    this.store.dispatch(new UpdateSportArena(sportArena));
  }

  public get selectParams(): Observable<SelectParams> {
    return this.allSportDisciplines$.pipe(
      flatMap((sportDisciplines: SportDiscipline[]) => of(
        sportDisciplines.map(sd => ({ label: sd.name, value: sd.id }))
      )),
      flatMap((selectOptions) => of({ isMultiple: true, id: 'test', options: selectOptions })));
  }

}
