import { SportObject } from '../models/sport-object';
import { SportArena } from '../models/sport-arena';
import { Action, State, StateContext } from '@ngxs/store';
import { Search } from '../components/client/search/search.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.generated.dev';
import { tap } from 'rxjs/operators';

export interface SearchResults {
  objects: Array<SportObject>;
  arenas: Array<SportArena>;
}

@State<SearchResults>({
  name: 'searchResults',
  defaults: {
    objects: [],
    arenas: []
  }
})
export class SearchResultsState {
  constructor(private http: HttpClient) { }

  @Action(Search)
  search({ getState, setState }: StateContext<SearchResults>, { params }: Search) {
    const url = environment.api.urls.search;

    return this.http.post(url, params.dto(), { withCredentials: true }).pipe(
      tap(resp => console.log(resp))
    );
  }
}
