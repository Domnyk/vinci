import { CurrentUserType } from './current-user-type';

export interface CurrentUser {
  email?: string;
  paypalEmail: string;
  type: CurrentUserType;
  displayName?: string;
}


