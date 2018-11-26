export interface CurrentUser {
  email: string;
  type: UserType;
  displayName?: string;
}

export enum UserType {
  Regular,
  ComplexesOwner
}
