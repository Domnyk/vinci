import {State, Action, StateContext, Selector, createSelector} from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { SportComplex } from '../models/sport-complex';
import { SportComplexService } from '../services/sport-complex.service';
import { FetchAllSportComplexes } from '../components/components.admin-dashboard/admin-dashboard/admin-dashboard.actions';
import { CreateNewSportComplex } from '../components/new-sport-complex/new-sport-complex.actions';
import { DeleteSportComplex } from '../components/components.admin-dashboard/admin-dashboard-sidebar/admin-dashboard-sidebar.actions';
import {Observable} from 'rxjs';


type SportComplexes = Array<SportComplex>;


@State<SportComplexes>({
  name: 'sportComplexes',
  defaults: []
})


export class SportComplexState {
  constructor(
    private sportComplexService: SportComplexService,
  ) { }

  static sportComplex(id: number) {
    return createSelector([SportComplexState], (state: SportComplexes) => {
      return state.filter(sportComplex => sportComplex.id === id);
    });
  }

  @Action(FetchAllSportComplexes)
  fetchAllSportComplexesHandler({ setState }: StateContext<SportComplexes>) {
    type StateUpdaterType = (SportComplexes) => void;
    const stateUpdater: StateUpdaterType = (sportComplexes) => {
      setState([...sportComplexes]);
    };

    return this.sportComplexService.fetchAll()
      .pipe(
        tap(stateUpdater)
      );
  }

  @Action(CreateNewSportComplex)
  newSportComplex({ getState, setState }: StateContext<SportComplexes>, { sportComplex }: CreateNewSportComplex) {
    type stateUpdaterType = (newSportComplex: SportComplex) => void;
    const stateUpdater: stateUpdaterType = (newSportComplex) => {
      setState(
        [...getState().concat(newSportComplex)]
      );
    };

    return this.sportComplexService.create(sportComplex)
      .pipe(
        tap(stateUpdater)
      );
  }

  @Action(DeleteSportComplex)
  deleteSportComplex({ getState, setState }: StateContext<SportComplexes>, { id }: DeleteSportComplex) {
    type stateUpdaterType = (deletedSportComplex: SportComplex) => void;
    const stateUpdater: stateUpdaterType = () => {
      const updatedSportComplexList: SportComplexes = getState().filter((sportComplex: SportComplex) => sportComplex.id !== id);
      setState(
        [...updatedSportComplexList]
      );
    };

    return this.sportComplexService.delete(id)
      .pipe(
        tap(stateUpdater)
      );
  }

}
