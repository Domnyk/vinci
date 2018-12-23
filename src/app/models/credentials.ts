import { DTO } from '../interfaces/dto';

export class Credentials implements DTO {
  constructor(
    public email: string,
    public password: string
  ) { }

  dto(): CredentialsDTO {
    return {
      email: this.email,
      password: this.password
    };
  }
}

interface CredentialsDTO {
  email: string;
  password: string;
}

