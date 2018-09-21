import { State, Action, StateContext } from '@ngxs/store';
import { tap, take } from 'rxjs/operators';

import { SportComplex } from '../models/sport-complex';
import { SportComplexService } from '../services/sport-complex/sport-complex.service';
import { FetchAllSportComplexes } from '../components/admin-dashboard/admin-dashboard.actions';
import { CreateNewSportComplex } from '../components/new-sport-complex/new-sport-complex.actions';

type SportComplexes = Array<SportComplex>;


@State<SportComplexes>({
  name: 'sportComplexes',
  defaults: []
})


export class SportComplexState {
  constructor(
    private sportComplexService: SportComplexService,
  ) { }

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
    type stateUpdaterType = (NewSportComplex) => void;
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

}
