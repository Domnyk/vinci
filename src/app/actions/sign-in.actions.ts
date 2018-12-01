import { Credentials } from '../models/credentials';

export class SignInWithPassword {
  static readonly type = `[sign-in component] User has clicked 'Sing in' button`;

  constructor(public user: Credentials) { }
}

export class UserHasSignedIn {
  static readonly type = `[] User has signed in`;

  constructor(public email: string, public displayName: string) { }
}
