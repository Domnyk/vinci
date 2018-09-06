export class User {
  constructor(
    public email: string,
    public password: string,
    public password_confirmation?: string,
    public login?: string,
    public display_name?: string
  ) { };
}

