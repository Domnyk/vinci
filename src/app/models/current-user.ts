import { CurrentUserType } from './current-user-type';

export interface CurrentUser {
  id: number;
  type: CurrentUserType;
  paypalEmail: string;

  email?: string;
  displayName?: string;
}


