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

export interface SportComplexListError {
  status: string;
  message: string;
}

export interface NewSportComplex {
  status: string;
  data: {
    name: string;
    id: number;
  };
}

export interface NewSportComplexError {
  status: string;
  errors: {
    name?: Array<string>;
  };
}
