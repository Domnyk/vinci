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

export interface EntityList<T> {
  status: string;
  data: Array<T>;
}


export interface NewEntity<T> {
  status: string;
  data: T;
}

export interface NewEntityError {
  status: string;
  errors: any;
}

export interface DeleteEntityError {
  status: string;
  errors: any;
}

export interface DeletedEntity {
  status: string;
  data: any;
}

export interface Response {
  status: string;
  data: any;
}

export interface ErrorResponse {
  status: string;
  errors: Array<any>;
}
