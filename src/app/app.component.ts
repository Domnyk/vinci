import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchUserTokenFromStorage } from './actions/user.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Vinci';

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new FetchUserTokenFromStorage());
  }
}
