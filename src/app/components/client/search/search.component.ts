import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchSportDisciplines } from '../../owner/complex-owner-dashboard/complex-owner-dasboard.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchParams } from '../../../models/search-params';
import { Search } from './search.actions';
import { Router } from '@angular/router';
import { format, lastDayOfMonth } from 'date-fns';
import * as pl from 'date-fns/locale/pl';
import { months } from './months';

// TODO: Replace date input with date picker
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  readonly months: Array<{key: string, value: number}> = months;
  readonly currentDate: CurrentDate;
  readonly lastDayOfMonth: number;

  disciplines: FormControl;
  price: FormControl;
  date: FormGroup;
  year: FormControl;
  month: FormControl;
  day: FormControl;

  constructor(private store: Store, private router: Router) {
    const currentDate = new Date();
    this.currentDate = {
      year: +format(currentDate, 'YYYY'),
      month: format(currentDate, 'MM', { locale: pl }),
      day: +format(currentDate, 'DD')
    };

    this.lastDayOfMonth = +format(lastDayOfMonth(currentDate), 'DD');

    this.price = new FormControl(0, [Validators.required]);
    this.year = new FormControl(this.currentDate.year, [
      Validators.required, Validators.min(this.currentDate.year)
    ]);
    this.month = new FormControl(this.months[+this.currentDate.month], [Validators.required]);
    this.day = new FormControl(this.currentDate.day, [Validators.required]);
    this.disciplines = new FormControl([], [Validators.required]);
  }

  ngOnInit() {
    this.store.dispatch(new FetchSportDisciplines());
  }

  searchForEvents() {
    this.disciplines.markAsTouched({ onlySelf: true });

    const day = this.day.value < 10 ? '0' + this.day.value : this.day.value,
          date = [this.year.value, this.month.value.value, day].join('-'),
          params = new SearchParams(this.disciplines.value, this.price.value, date);

    this.store.dispatch(new Search(params));
    this.router.navigate(['search_results']);
  }

}

interface CurrentDate {
  readonly year: number;
  readonly month: string;
  readonly day: number;
}
