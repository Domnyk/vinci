import { SportComplex } from './sport-complex';

export interface SignInResponse {
  status: string;
  email: string;
  access_type: string;
  token: string;
}

// TODO: This interface should stick to convention { status: string, data: Object }
export interface SignUpResponse {
 status: string;
 id: number;
 email: string;
 login?: string;
 display_name?: string;
}

export interface SportComplexList {
  status: string;
  data: Array<Object>;
}

export interface NewSportComplex {
  status: string;
  data: SportComplex;
}

// TODO: errors property should have proper type
export interface NewSportComplexError {
  status: string;
  errors: any;
}

export interface DeletedSportComplex {
  status: string;
  data: {
    sport_complex: SportComplex
  };
}

// TODO: errors property should have proper type
export interface DeletedSportComplexError {
  status: string;
  errors: any;
}
