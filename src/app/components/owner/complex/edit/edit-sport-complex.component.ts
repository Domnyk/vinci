import { Component , OnInit } from '@angular/core';
import { SportComplex } from '../../../../models/sport-complex';
import { Store } from '@ngxs/store';
import { FormControl, Validators } from '@angular/forms';
import { UpdateSportComplex } from './edit-sport-complex.actions';
import { ActivatedRoute } from '@angular/router';
import { SportComplexState } from '../../../../state/sport-complex.state';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-edit-sport-complex',
  templateUrl: './edit-sport-complex.component.html',
  styleUrls: ['./edit-sport-complex.component.css']
})
export class EditSportComplexComponent implements OnInit {
  private sportComplexToEdit: SportComplex = new SportComplex(null);
  sportComplexNameFormControl: FormControl;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,

  ) {
    this.sportComplexNameFormControl = new FormControl('', [
      Validators.required
    ]);
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe( url => {
      const sportComplexId = +url[1].path;

      this.store.select(SportComplexState.sportComplex).pipe(
        map(filterFn => filterFn(sportComplexId)),
        map((sportComplexes: Array<SportComplex>) => sportComplexes[0]),
      ).subscribe((sportComplex) => {
        this.sportComplexToEdit.name = sportComplex.name;
        this.sportComplexToEdit.id = sportComplex.id;

        this.sportComplexNameFormControl.setValue(this.sportComplexToEdit.name);
      });
    });
  }

  // TODO: How conveniently connect form controls with model?
  onSubmit() {
    this.sportComplexToEdit.name = this.sportComplexNameFormControl.value;
    this.store.dispatch(new UpdateSportComplex(this.sportComplexToEdit));
  }

}
