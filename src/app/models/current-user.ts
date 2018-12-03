export interface CurrentUser {
  isSignedIn: boolean;
  data: {
    email: string;
    type: UserType;
    displayName?: string;
  };
}

export enum UserType {
  Regular,
  ComplexesOwner
}
