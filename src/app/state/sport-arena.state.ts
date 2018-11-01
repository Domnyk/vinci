import { SportArena } from '../models/sport-arena';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { environment } from '../../environments/environment.generated.dev';
import { ShowFlashMessage } from '../actions/flash-message.actions';
import { tap } from 'rxjs/operators';
import { ErrorResponse, Response } from '../models/api-response';
import { _ } from 'underscore';
import { HttpClient } from '@angular/common/http';
import { FetchSportArenasInSportObject } from '../components/owner/object/show/sport-object.actions';
import { CreateSportArena } from '../components/owner/arena/new/new-sport-arena.actions';

type SportArenas = Array<SportArena>;

@State<SportArenas>({
  name: 'SportArenas',
  defaults: []
})
export class SportArenaState {
  static readonly parentResourceName: string = 'sport_objects';
  static readonly resourceName: string = 'sport_arenas';

  constructor(
    private store: Store,
    private http: HttpClient,
  ) {}

  @Selector()
  static sportArena(state: SportArenas) {
    return (id: number) => {
      return state.filter(sportArena => sportArena.id === +id);
    };
  }

  @Selector()
  static sportArenasInSportObject(state: SportArenas) {
    return (sportObjectId: number) => {
      return state.filter(sportArena => sportArena.sportObjectId === +sportObjectId);
    };
  }

  @Action(FetchSportArenasInSportObject)
  fetchSportArenasInSportObject({ getState, setState }: StateContext<SportArenas>, { sportObjectId }: FetchSportArenasInSportObject) {
    const url = environment.api.resource(SportArenaState.parentResourceName, sportObjectId, SportArenaState.resourceName),
          stateUpdater = (response: Response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie pobierania listy aren sportowych'));
              return;
            }

            const sportArenasData = response.data.sport_arenas,
              sportArenas = sportArenasData.map((sportArenaData: any) => SportArena.fromDTO(sportArenaData)),
              newState = _.uniq([...getState(), ...sportArenas], true, (sportObject) => sportObject.id);
            setState(newState);
          };

    return this.http.get(url).pipe(tap(stateUpdater));
  }

  @Action(CreateSportArena)
  createSportArena({ getState, setState }: StateContext<SportArenas>, { sportArena }: CreateSportArena) {
    const url = environment.api.resource(SportArenaState.parentResourceName, sportArena.sportObjectId, SportArenaState.resourceName),
          stateUpdater = (response: Response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie tworzenia areny sportowej'));
              return;
            }

            const createdSportArena: SportArena = SportArena.fromDTO(response.data.sport_arena),
                  newState = [...getState(), createdSportArena];
            setState(newState);
            this.store.dispatch(new ShowFlashMessage('Pomyślnie utworzono arenę sportową'));
          };

    return this.http.post(url, sportArena.dto())
      .pipe(tap(stateUpdater))
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  private handleError(errorResponse: ErrorResponse) {
    console.debug('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessage('Wystąpił błąd'));
  }
}

