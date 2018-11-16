import { SportObject } from '../models/sport-object';
import { SportArena } from '../models/sport-arena';
import { Action, State, StateContext } from '@ngxs/store';
import { Search } from '../components/client/search/search.actions';

export interface SearchResults {
  objects: Array<SportObject>;
  arenas: Array<SportArena>;
}

const object = new SportObject(1, 'Obiekt na potrzeby testów',
  { street: 'Szkolna', postalCode: '05-270', city: 'Marki', buildingNumber: '9' },
  { lat: 52.317367, lng: 21.103514 }, { days: 1, seconds: 1, months: 1 });

@State<SearchResults>({
  name: 'searchResults',
  defaults: {
    objects: [object],
    arenas: [
      new SportArena(1, 'Arena na potrzeby testów stanu', [1], 1),
      new SportArena(2, 'Arena na potrzeby testów stanu', [1], 1)
    ]
  }
})
export class SearchResultsState {
  @Action(Search)
  search({ getState, setState }: StateContext<SearchResults>, { params }: Search) { }
}
