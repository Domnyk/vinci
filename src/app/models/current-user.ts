export interface CurrentUser {
  isSignedIn: boolean;
  data: {
    email: string;
    type: UserType;
    displayName?: string;
    id?: number;
  };
}

export enum UserType {
  Regular,
  ComplexesOwner
}

export enum ParticipationStatus {
  DID_NOT_JOIN,
  JOINED,
  PAYED
}
