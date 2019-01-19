export interface SignInWithPasswordResponse {
  id: number;
  email: string;
  paypal_email: string;
}

export interface SignInWithPasswordErrorResponse {
  credentials: string
}
