import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { SportComplex } from '../models/sport-complex';
import { FetchAllSportComplexes } from '../components/components.complex-owner-dashboard/complex-owner-dashboard/complex-owner-dasboard.actions';
import { CreateNewSportComplex } from '../components/components.complex-owner-dashboard/new-sport-complex/new-sport-complex.actions';
import { DeleteSportComplex } from '../components/components.complex-owner-dashboard/admin-dashboard-sidebar/admin-dashboard-sidebar.actions';
import { EntityService } from '../services/entity.service';


type SportComplexes = Array<SportComplex>;


@State<SportComplexes>({
  name: 'sportComplexes',
  defaults: []
})


export class SportComplexState {
  constructor(
    private sportComplexService: EntityService<SportComplex>
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

  @Action(DeleteSportComplex)
  deleteSportComplex({ getState, setState }: StateContext<SportComplexes>, { id }: DeleteSportComplex) {
    type stateUpdaterType = (deletedSportComplex: SportComplex) => void;
    const stateUpdater: stateUpdaterType = () => {
      const updatedSportComplexList: SportComplexes = getState().filter((sportComplex: SportComplex) => sportComplex.id !== id);
      setState(
        [...updatedSportComplexList]
      );
    };

    return this.sportComplexService.delete(id, 'sport_complexes')
      .pipe(
        tap(stateUpdater)
      );
  }

}
