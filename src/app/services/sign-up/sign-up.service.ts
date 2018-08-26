import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private http: HttpClient) { }

  signUp(model: User) {
    return this.http.post(environment.api.signUpAddress, model);
  }
}
