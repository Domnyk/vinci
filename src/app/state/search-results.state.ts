import { SportObject } from '../models/sport-object';
import { SportArena } from '../models/sport-arena';
import { Action, State, StateContext } from '@ngxs/store';
import { Search } from '../components/client/search/search.actions';

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
  @Action(Search)
  search({ getState, setState }: StateContext<SearchResults>, { params }: Search) { }
}
