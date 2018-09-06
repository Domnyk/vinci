export class SignInUser {
  static readonly type = '[USER] Sign in'

  constructor(public payload: any) { }
}

export class SignUpUser {
  static readonly type = '[USER] Sign up'

  constructor(public payload: any) { }
}