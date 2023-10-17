export interface SignupType {
  name: string;
  email: string;
  password: string;
}

export interface SigninType {
  email: string;
  password: string;
};

export interface AuthType {
  token: string;
}