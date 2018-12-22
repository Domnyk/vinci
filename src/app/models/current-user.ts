import { CurrentUserType } from './current-user-type';

export interface CurrentUser {
  id?: number;
  paypalEmail: string;
  email: string;
  type: CurrentUserType;
  displayName?: string;
}


