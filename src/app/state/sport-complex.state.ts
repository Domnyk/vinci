import { State, Action, StateContext, createSelector, Selector, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { SportComplex } from '../models/sport-complex';
import { FetchAllSportComplexes } from '../components/owner/complex-owner-dashboard/complex-owner-dasboard.actions';
import { CreateNewSportComplex } from '../components/owner/complex/new/new-sport-complex.actions';
import { DeleteSportComplex } from '../components/owner/complex/delete/delete-sport-complex.actions';
import { EntityService } from '../services/entity.service';
import { _ } from 'underscore';

import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { UpdateSportComplex } from '../components/owner/complex/edit/edit-sport-complex.actions';
import { ShowFlashMessage } from '../actions/flash-message.actions';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs/index';

type SportComplexes = Array<SportComplex>;


@State<SportComplexes>({
  name: 'sportComplexes',
  defaults: []
})


export class SportComplexState {
  constructor(
    private sportComplexService: EntityService<SportComplex>,
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
    type StateUpdaterType = (SportComplexes) => void;
    const stateUpdater: StateUpdaterType = (sportComplexes) => {
      setState([...sportComplexes.sport_complexes]);
    };

    return this.sportComplexService.fetchAll('sport_complexes')
      .pipe(
        tap(stateUpdater)
      );
  }

  // TODO: Replace any with something more appropriate
  @Action(CreateNewSportComplex)
  newSportComplex({ getState, setState }: StateContext<SportComplexes>, { sportComplex }: CreateNewSportComplex) {
    type stateUpdaterType = (newSportComplex: any) => void;
    const stateUpdater: stateUpdaterType = (newSportComplex) => {
      setState(
        [...getState().concat(newSportComplex.sport_complex)]
      );
    };

    return this.sportComplexService.create(sportComplex, 'sport_complexes')
      .pipe(
        tap(stateUpdater)
      );
  }

  @Action(UpdateSportComplex)
  updateSportComplex({ getState, setState }: StateContext<SportComplexes>, { sportComplexToUpdate }: UpdateSportComplex) {
    console.debug('SportComplexToUpdate: ', sportComplexToUpdate);

    const url = environment.api.resource('sport_complexes', sportComplexToUpdate.id),
      stateUpdater = (response) => {
        if (response.status === 'error') {
          this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie aktualizacja danych kompleksu sportowego'));
          return;
        }

        const updatedSportComplex = response.data.sport_complex,
              newState = getState().map(sportComplex => sportComplex.id === sportComplexToUpdate.id ? updatedSportComplex : sportComplex);


        setState(newState);
        this.store.dispatch(new ShowFlashMessage('Kompleks sportowy został pomyślnie zaktualizowany'));
      };

    return this.http.put(url, { data: { sport_complex: sportComplexToUpdate } }).pipe(tap(stateUpdater));
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
}
