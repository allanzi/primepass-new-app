export interface UserState {
  user: User;
  auth: Auth;
  loadingIdentifier: boolean;
  loadingCode: boolean;
  loadingVerify: boolean;
  error: null | Error;
  period: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
}

export interface Error {
  type: string;
  message: string;
}

export interface Auth {
  token: string | null | undefined;
}

export interface SignupPayload {
  name: string;
  document: string;
  phone: string;
  token: string;
  type?: string;
}
