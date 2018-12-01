import { getActionTypeFromInstance } from '@ngxs/store';
import { tap } from 'rxjs/operators';

export function initStateFromStorage(state, action, next) {


  if (getActionTypeFromInstance(action) === '@@INIT') {
    const rawState = localStorage.getItem('@@STATE'),
          isStatePresent = !!rawState;

    if (isStatePresent) {
      const stateFromStorage = JSON.parse(localStorage.getItem('@@STATE'));
      return next(stateFromStorage, action).pipe(tap(() => console.log('stateFromStorage: ', stateFromStorage)));
    }
  }

  return next(state, action);
}
