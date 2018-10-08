export class SignUpUser {
  static readonly type = '[USER] Sign up'

  constructor(public payload: any) { }
}

export class FetchUserTokenFromStorage {
  static readonly type = '[Any component] Fetch user token from HTML5 Storage';

  constructor() { }
}
