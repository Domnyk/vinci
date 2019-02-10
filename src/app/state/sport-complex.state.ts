import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { FetchAllSportComplexes } from '../components/owner/complex-owner-dashboard/complex-owner-dasboard.actions';
import { CreateNewSportComplex } from '../components/owner/complex/new/new-sport-complex.actions';
import { DeleteSportComplex } from '../components/owner/complex/delete/delete-sport-complex.actions';
import { _ } from 'underscore';

import { environment } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { UpdateSportComplex } from '../components/owner/complex/edit/edit-sport-complex.actions';
import { ShowFlashMessageOnEdited, ShowFlashMessageOnSuccessfulOperation } from '../actions/flash-message.actions';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ErrorResponse, Response } from '../models/api-response';
import { Complex } from '../models/complex';
import { Router } from '@angular/router';
import { handleError } from './error-handler';

type Complexes = Complex[];

@State<Complexes>({
  name: 'sportComplexes',
  defaults: []
})


export class SportComplexState {
  static readonly resourceName: string = 'complexes';

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) { }

  @Selector()
  static getById(state: Complexes) {
    return (id: number) => {
      return state.filter(sportComplex => sportComplex.id === +id)[0];
    };
  }

  @Action(FetchAllSportComplexes)
  fetchAllSportComplexesHandler({ setState }: StateContext<Complexes>) {
    type StateUpdaterType = (response: any[]) => void;
    const url = environment.api.resource(SportComplexState.resourceName),
          stateUpdater: StateUpdaterType = (response) => setState([...response]);

    return this.http.get(url, { withCredentials: true })
      .pipe(
        tap(stateUpdater)
      );
  }

  @Action(CreateNewSportComplex)
  newSportComplex({ getState, setState }: StateContext<Complexes>, { dto }: CreateNewSportComplex) {
    type stateUpdaterType = (response: any) => void;
    const url = environment.api.resource(SportComplexState.resourceName),
          stateUpdater: stateUpdaterType = (response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Wystąpił błąd w czasie tworzenia kompleksu sportowego'));
              return;
            }

            setState([...getState().concat(response)]);
            this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Pomyślnie stworzono kompleks sportowy'));
            this.router.navigate(['/owner/complex/' + response.id]);
          };

    return this.http.post(url, dto, { withCredentials: true }).pipe(
      tap(stateUpdater)
    );
  }

  @Action(UpdateSportComplex)
  updateSportComplex({ getState, setState }: StateContext<Complexes>, { complex }: UpdateSportComplex) {
    const url = environment.api.resource(SportComplexState.resourceName, complex.id),
      stateUpdater = (response: any) => {
        if (response.status === 'error') {
          this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Wystąpił błąd w czasie aktualizacja danych kompleksu sportowego'));
          return;
        }

        const updatedSportComplex = response,
              newState = getState().map(sportComplex => sportComplex.id === complex.id ? updatedSportComplex : sportComplex);


        setState(newState);
        this.store.dispatch(new ShowFlashMessageOnEdited('Kompleks sportowy został pomyślnie zaktualizowany'));
      };

    return this.http.put(url, complex.dto(), { withCredentials: true }).pipe(
      tap(stateUpdater)
    );
  }

  @Action(DeleteSportComplex)
  deleteSportComplex({ getState, setState }: StateContext<Complexes>, { id }: DeleteSportComplex) {
    const url = environment.api.resource(SportComplexState.resourceName, id),
      successDeletionHandler = () => {
        const updatedSportComplexList: Complexes = getState().filter((complex: Complex) => complex.id !== id);
        setState(
          [...updatedSportComplexList]
        );
      };

    return this.http.delete(url, { withCredentials: true })
      .pipe(
        map(successDeletionHandler),
        catchError((error) => handleError(error, this.store))
      );
  }
}
