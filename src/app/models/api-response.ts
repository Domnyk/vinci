// TODO: This interface should stick to convention { status: string, data: ObjectFormModel }
export interface SignUpResponse {
 status: string;
 id: number;
 email: string;
 login?: string;
 display_name?: string;
}

export interface Response {
  status: string;
  data: any;
}

export interface ErrorResponse {
  status: string;
  errors: Array<any>;
}
