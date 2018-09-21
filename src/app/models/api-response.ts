import {SportComplex} from './sport-complex';

export interface SignInApiResponse {
  status: string;
  email: string;
  access_type: string;
  token: string;
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
