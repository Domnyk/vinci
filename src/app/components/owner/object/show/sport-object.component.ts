import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';
import { SportObject } from '../../../../models/sport-object';
import { Observable } from 'rxjs/index';
import { Store } from '@ngxs/store';
import { SportObjectState } from '../../../../state/sport-object.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sport-object',
  templateUrl: './sport-object.component.html',
  styleUrls: ['./sport-object.component.css']
})
export class SportObjectComponent implements OnInit {
  public sportObject$: Observable<SportObject>;
  public sportArenas$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      ({ id }: Params) => {
        this.sportObject$ = this.store.select(SportObjectState.sportObject).pipe(
          map(filterFn => filterFn(id)),
          map((sportObjects: Array<SportObject>) => sportObjects[0])
        );

        // this.store.dispatch(new FetchSportObjectsInSportComplex(id));
      }
    );
  }

}
