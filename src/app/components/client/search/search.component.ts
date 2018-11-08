import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchSportDisciplines } from '../../owner/complex-owner-dashboard/complex-owner-dasboard.actions';
import { FormControl, Validators } from '@angular/forms';
import { SearchParams } from '../../../models/search-params';
import { customDateValidator } from '../../../custom-validators';
import { Search } from './search.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  disciplines: FormControl;
  price: FormControl;
  date: FormControl;

  constructor(private store: Store) {
    this.price = new FormControl(0, [
      Validators.required
    ]);

    this.date = new FormControl('dd.mm.rrrr', [
      Validators.required,
      customDateValidator()
    ]);

    this.disciplines = new FormControl([], [
      Validators.required
    ]);
  }

  ngOnInit() {
    this.store.dispatch(new FetchSportDisciplines());
  }

  searchForEvents() {
    const params = new SearchParams(this.disciplines.value, this.price.value, this.date.value);
    this.store.dispatch(new Search(params));
  }

}
