import { Component, OnInit } from '@angular/core';
import { FetchSportDisciplines } from './new-sport-arena.actions';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SportDiscipline } from '../../../models/sport-discipline';

@Component({
  selector: 'app-new-sport-arena',
  templateUrl: './new-sport-arena.component.html',
  styleUrls: ['./new-sport-arena.component.css']
})
export class NewSportArenaComponent implements OnInit {
  @Select(state => state.sportDisciplines) sportDisciplines$: Observable<SportDiscipline[]>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new FetchSportDisciplines());
  }
}
