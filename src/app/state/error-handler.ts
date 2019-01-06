import { ERROR } from '../models/error';
import { EMPTY, Observable } from 'rxjs';
import { ShowFlashMessageOnError } from '../actions/flash-message.actions';
import { Store } from '@ngxs/store';
import { HttpErrorResponse } from '@angular/common/http';

export function handleError(error: ERROR | HttpErrorResponse, store: Store): Observable<never> {
  let errors: Array<ERROR> = null;

  if (error instanceof HttpErrorResponse) {
    errors = parseIntoEnum(error);
  } else {
    errors = [error];
  }

  const msg = createErrorMsg(errors);

  store.dispatch(new ShowFlashMessageOnError(msg));
  return EMPTY;
}

function parseIntoEnum(error: HttpErrorResponse): Array<ERROR> {
  const VALUE_TAKEN = 'has already been taken';

  return <Array<ERROR>>Object.keys(error.error).map((key) => {
    const value: string = error.error[key][0];

    if (key === 'email' && value === VALUE_TAKEN) {
      return ERROR.EMAIL_TAKEN;
    } else if (key === 'paypal_email' && value === VALUE_TAKEN) {
      return ERROR.PAYPAL_EMAIL_TAKEN;
    }
  });
}

function createErrorMsg(errors: Array<ERROR>): string {
  return errors
    .map(error => {
      switch (error) {
        case ERROR.NO_SUCH_ADDRESS:
          return 'Nie ma takieg adresu. Podaj poprawny adres i spróbuj ponownie';
        case ERROR.EMAIL_TAKEN:
          return 'Ten adres mailowy jest już zajęty.';
        case ERROR.PAYPAL_EMAIL_TAKEN:
          return 'Ten adres konta Paypal jest już zajęty.';
        default:
          return 'Wystąpił błąd. Spróbuj ponownie później';
      }
    })
    .reduce((prev, curr) => prev + curr + '\n', '');
}


