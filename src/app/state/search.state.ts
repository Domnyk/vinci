import { Action, State, StateContext } from '@ngxs/store';
import { Search } from '../components/client/search/search.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.generated.dev';
import { tap } from 'rxjs/operators';
import { SearchParams } from '../models/search-params';
import { SearchResult } from '../models/search-result';
import { SearchResponse } from '../models/api-responses/search-response';
import { Router } from '@angular/router';

export interface SearchInfo {
  results: Array<SearchResult>;
  params: SearchParams;
}

@State<SearchInfo>({
  name: 'search',
  defaults: {
    results: [],
    params: null
  }
})
export class SearchState {
  constructor(private http: HttpClient, private router: Router) { }

  @Action(Search)
  search({ getState, setState }: StateContext<SearchInfo>, { params }: Search) {
    const url = environment.api.urls.search,
          updateState = (resp: SearchResponse) => {
            const newState: SearchInfo = { params: null, results: null },
                  results = resp.results.map(result => {
                    return { objectId: result.object_id, lowestPrice: result.lowest_price, distance: result.distance };
                  });

            newState.params = new SearchParams(resp.params.disciplines, resp.params.day, resp.params.geo_location);
            newState.results = results;
            setState(newState);
          };

    return this.http.post(url, params.dto(), { withCredentials: true }).pipe(
      tap((resp: SearchResponse) => updateState(resp)),
      tap(() => this.router.navigate(['/search_results']))
    );
  }
}
