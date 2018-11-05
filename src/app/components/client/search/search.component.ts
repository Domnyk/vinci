import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchSportDisciplines } from '../../owner/complex-owner-dashboard/complex-owner-dasboard.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new FetchSportDisciplines());
  }

  searchForEvents() {
    console.info('Search form has been submitted');
  }

}
