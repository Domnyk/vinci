import { User } from '../models/user';

export class SignInWithPassword {
  static readonly type = `[sign-in component] User has clicked 'Sing in' button`;

  constructor(public user: User) { }
}
