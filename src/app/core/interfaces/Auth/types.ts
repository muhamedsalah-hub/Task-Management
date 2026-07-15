export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignUpData {
  email: string;
  password: string;
  data: { name: string; job_title: string };
}

export interface IUserdata {
  id: string;
  name: string;
  role: string;
}

interface IUserMetadata {
  name: string;
  email: string;
}

interface ILoginUserMetadata extends IUserMetadata {
  department: string;
}

interface ISignupUserMetadata extends IUserMetadata {
  job_title: string;
}

interface IAuthResponse<TMetadata> {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  user: {
    id: string;
    user_metadata: TMetadata;
  };
}

export type ILoginResponse = IAuthResponse<ILoginUserMetadata>;

export type ISignupResponse = IAuthResponse<ISignupUserMetadata>;
