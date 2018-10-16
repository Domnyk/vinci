import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SportComplex } from '../../../models/sport-complex';
import { Store } from '@ngxs/store';
import { CreateNewSportComplex } from './new-sport-complex.actions';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-sport-complex',
  templateUrl: './new-sport-complex.component.html',
  styleUrls: ['./new-sport-complex.component.css']
})
export class NewSportComplexComponent implements OnInit {
  @Input() sportComplexToEdit: SportComplex;
  @Output() newSportComplex = new EventEmitter<SportComplex>();

  sportComplex: SportComplex;
  sportComplexNameFormControl: FormControl;

  constructor(
    private store: Store,
  ) {
    this.sportComplex = new SportComplex(null);
    this.sportComplexNameFormControl = new FormControl('', [
      Validators.required
    ]);
  }

  ngOnInit() {
    let sportComplexName: string = null;
    if (!!this.sportComplexToEdit) {
      sportComplexName = this.sportComplexToEdit.name;
    } else {
      sportComplexName = this.sportComplex.name;
    }

    this.sportComplexNameFormControl.setValue(sportComplexName);
  }

  // TODO: How conveniently connect form controls with model?
  onSubmit() {
    this.sportComplex.name = this.sportComplexNameFormControl.value;
    this.store.dispatch(new CreateNewSportComplex(this.sportComplex));
  }

}
