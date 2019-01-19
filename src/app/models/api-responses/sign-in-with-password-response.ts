export interface SignInWithPasswordResponse {
  id: number;
  email: string;
  paypal_email: string;
  csrf_token: string;
}

export interface SignInWithPasswordErrorResponse {
  credentials: string;
}
