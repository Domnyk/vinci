import { SportArena } from '../models/sport-arena';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { environment } from '../../environments/environment.generated.dev';
import {
  ShowFlashMessageOnCreated,
  ShowFlashMessageOnEdited,
  ShowFlashMessageOnSuccessfulOperation
} from '../actions/flash-message.actions';
import { catchError, tap } from 'rxjs/operators';
import { ErrorResponse, Response } from '../models/api-response';
import { _ } from 'underscore';
import { HttpClient } from '@angular/common/http';
import { FetchSportArenasInSportObject } from '../components/owner/object/show/sport-object.actions';
import { CreateSportArena } from '../components/owner/arena/new/new-sport-arena.actions';
import { DeleteSportArena } from '../components/owner/arena/delete/delete-sport-arena.actions';
import { UpdateSportArena } from '../components/owner/arena/edit/edit-sport-arena.actions';
import { InsertArenas } from '../actions/sport-arena.actions';
import { SportDiscipline } from '../models/sport-discipline';
import { handleError } from './error-handler';

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

  @Selector()
  static disciplinesInObject(state: SportArenas) {
    return (id: number) => {
      return state
        .filter(arena => arena.sportObjectId === id)
        .map(arena => arena.sportDisciplines)
        .reduce((prev, curr) => [...prev, ...curr], [])
        .map((discipline: SportDiscipline) => discipline.name);
    };
  }

  @Action(InsertArenas)
  insertArenas({ getState, setState }: StateContext<SportArenas>, { sportArenasData }: InsertArenas) {
    const sportArenas: SportArena[] = sportArenasData.map(sport_arena => SportArena.fromDTO(sport_arena)),
          newState = _.uniq([...getState(), ...sportArenas], true, (sportObject) => sportObject.id);

    setState(newState);
  }

  @Action(FetchSportArenasInSportObject)
  fetchSportArenasInSportObject({ getState, setState }: StateContext<SportArenas>, { sportObjectId }: FetchSportArenasInSportObject) {
    const url = environment.api.resource(SportArenaState.parentResourceName, sportObjectId, SportArenaState.resourceName),
          stateUpdater = (response: Response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Wystąpił błąd w czasie pobierania listy aren sportowych'));
              return;
            }

            const sportArenasData = response.data.sport_arenas,
              sportArenas = sportArenasData.map((sportArenaData: any) => SportArena.fromDTO(sportArenaData)),
              newState = _.uniq([...getState(), ...sportArenas], true, (sportObject) => sportObject.id);
            setState(newState);
          };

    return this.http.get(url, { withCredentials: true }).pipe(tap(stateUpdater));
  }

  @Action(CreateSportArena)
  createSportArena({ getState, setState }: StateContext<SportArenas>, { sportArena }: CreateSportArena) {
    const url = environment.api.resource(SportArenaState.parentResourceName, sportArena.sportObjectId, SportArenaState.resourceName),
          stateUpdater = (response: Response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Wystąpił błąd w czasie tworzenia areny sportowej'));
              return;
            }

            const createdSportArena: SportArena = SportArena.fromDTO(response.data.sport_arena),
                  newState = [...getState(), createdSportArena];
            setState(newState);
            this.store.dispatch(new ShowFlashMessageOnCreated('Pomyślnie utworzono arenę sportową'));
          };

    return this.http.post(url, sportArena.dto(), { withCredentials: true }).pipe(
      tap(stateUpdater),
      catchError(error => handleError(error, this.store))
    );
  }

  @Action(DeleteSportArena)
  deleteSportArena({ getState, setState }: StateContext<SportArenas>, { id }: DeleteSportArena) {
    const url = environment.api.resource('sport_arenas', id),
      successDeletionHandler = () => {
        const updatedSportArenaList: SportArenas = getState().filter((sportArena: SportArena) => sportArena.id !== id);
        setState(
          [...updatedSportArenaList]
        );
      };

    return this.http.delete(url, { withCredentials: true }).pipe(
      tap(successDeletionHandler),
      catchError(error => handleError(error, this.store))
    );
  }

  @Action(UpdateSportArena)
  updateSportArena({ getState, setState }: StateContext<SportArenas>, { sportArena }: UpdateSportArena) {
    const url = environment.api.resource('sport_arenas', sportArena.id),
      stateUpdater = (response: Response) => {
        if (response.status === 'error') {
          this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Wystąpił błąd w czasie aktualizacja danych areny sportowej'));
          return;
        }

        const updatedSportArena = SportArena.fromDTO(response.data.sport_arena),
          newState = getState().map((sportArenaFromState: SportArena) => sportArenaFromState.id === sportArena.id ? updatedSportArena : sportArenaFromState);


        setState(newState);
        this.store.dispatch(new ShowFlashMessageOnEdited('Arena sportowa została pomyślnie zaktualizowana'));
      };

    return this.http.put(url, sportArena.dto(), { withCredentials: true }).pipe(
      tap(stateUpdater),
      catchError(error => handleError(error, this.store))
    );
  }

  private handleError(errorResponse: ErrorResponse) {
    console.debug('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Wystąpił błąd'));
  }
}

