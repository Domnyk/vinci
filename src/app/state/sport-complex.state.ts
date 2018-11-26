import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { SportComplex } from '../models/sport-complex';
import { FetchAllSportComplexes } from '../components/owner/complex-owner-dashboard/complex-owner-dasboard.actions';
import { CreateNewSportComplex } from '../components/owner/complex/new/new-sport-complex.actions';
import { DeleteSportComplex } from '../components/owner/complex/delete/delete-sport-complex.actions';
import { _ } from 'underscore';

import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { UpdateSportComplex } from '../components/owner/complex/edit/edit-sport-complex.actions';
import { ShowFlashMessage } from '../actions/flash-message.actions';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorResponse, Response } from '../models/api-response';

type SportComplexes = Array<SportComplex>;


@State<SportComplexes>({
  name: 'sportComplexes',
  defaults: []
})


export class SportComplexState {
  static readonly resourceName: string = 'sport_complexes';

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  @Selector()
  static sportComplex(state: SportComplexes) {
    return (id: number) => {
      return state.filter(sportComplex => sportComplex.id === +id);
    };
  }

  @Action(FetchAllSportComplexes)
  fetchAllSportComplexesHandler({ setState }: StateContext<SportComplexes>) {
    type StateUpdaterType = (response: Response & ErrorResponse) => void;
    const url = environment.api.resource(SportComplexState.resourceName),
          stateUpdater: StateUpdaterType = (response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie pobierania listy kompleksów sportowych'));
              return;
            }

            setState([...response.data.sport_complexes]);
          };

    return this.http.get(url)
      .pipe(
        tap(stateUpdater)
      );
  }

  @Action(CreateNewSportComplex)
  newSportComplex({ getState, setState }: StateContext<SportComplexes>, { sportComplex }: CreateNewSportComplex) {
    type stateUpdaterType = (response: Response) => void;
    const url = environment.api.resource(SportComplexState.resourceName),
          stateUpdater: stateUpdaterType = (response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie tworzenia kompleksu sportowego'));
              return;
            }

            setState([...getState().concat(response.data.sport_complex)]);
            this.store.dispatch(new ShowFlashMessage('Pomyślnie stworzono kompleks sportowy'));
          };

    return this.http.post(url, sportComplex.dto(), { withCredentials: true })
      .pipe(tap(stateUpdater))
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  @Action(UpdateSportComplex)
  updateSportComplex({ getState, setState }: StateContext<SportComplexes>, { sportComplexToUpdate }: UpdateSportComplex) {
    console.debug('sportComplexToUpdate: ', sportComplexToUpdate);

    const url = environment.api.resource('sport_complexes', sportComplexToUpdate.id),
      stateUpdater = (response: Response) => {
        if (response.status === 'error') {
          this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie aktualizacja danych kompleksu sportowego'));
          return;
        }

        const updatedSportComplex = response.data.sport_complex,
              newState = getState().map(sportComplex => sportComplex.id === sportComplexToUpdate.id ? updatedSportComplex : sportComplex);


        setState(newState);
        this.store.dispatch(new ShowFlashMessage('Kompleks sportowy został pomyślnie zaktualizowany'));
      };

    return this.http.put(url, sportComplexToUpdate.dto())
      .pipe(tap(stateUpdater))
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  @Action(DeleteSportComplex)
  deleteSportComplex({ getState, setState }: StateContext<SportComplexes>, { id }: DeleteSportComplex) {
    const url = environment.api.resource('sport_complexes', id),
      successDeletionHandler = () => {
        const updatedSportComplexList: SportComplexes = getState().filter((sportComplex: SportComplex) => sportComplex.id !== id);
        setState(
          [...updatedSportComplexList]
        );
      },
      failureDeletionHandler = (error: any) => {
        return throwError('Sport complex still has sport objects');
      };

    return this.http.delete(url)
      .pipe(
        map(successDeletionHandler),
        catchError(failureDeletionHandler),
      );
  }

  private handleError(errorResponse: ErrorResponse) {
    console.debug('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessage('Wystąpił błąd'));
  }
}
