import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { map } from 'rxjs/operators';

type asyncValidator = (control: AbstractControl) => Observable<ValidationErrors | null>;

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(private http: HttpClient) { }

  uniqueComplexNameValidator(): asyncValidator {
    const url = environment.api.urls.validate.complex,
          parseResponse = (resp) => resp.valid;

    return (control: AbstractControl) => {
      return this.http.post(url, { name: control.value }).pipe(
        map(parseResponse),
        map(isValid => (isValid ? null : { isNameUnique: false }))
      );
    };
  }
}


