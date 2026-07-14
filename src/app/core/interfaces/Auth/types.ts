export interface ILoginData {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  role: string;
}

export interface ILoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: IUserResponse;
  weak_password: null;
}

interface IUserResponse {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: Appmetadata;
  user_metadata: Usermetadata;
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: Usermetadata;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}

interface Usermetadata {
  department: string;
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  sub: string;
}

interface Appmetadata {
  provider: string;
  providers: string[];
}
