import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SportComplex } from '../../models/sport-complex';
import { Store } from '@ngxs/store';
import { CreateNewSportComplex } from './new-sport-complex.actions';

@Component({
  selector: 'app-new-sport-complex',
  templateUrl: './new-sport-complex.component.html',
  styleUrls: ['./new-sport-complex.component.css']
})
export class NewSportComplexComponent implements OnInit {
  @Output() newSportComplex = new EventEmitter<SportComplex>();

  sportComplex = new SportComplex(null);

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.store.dispatch(new CreateNewSportComplex(this.sportComplex));
  }

}
