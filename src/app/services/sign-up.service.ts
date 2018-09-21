import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private http: HttpClient) { }

  // TODO: This function should do more i.e: return Observable with new user data and return error when user registration fails
  signUp(model: User): Observable<Object> {
    return this.http.post(environment.api.signUpAddress, model);
  }
}
