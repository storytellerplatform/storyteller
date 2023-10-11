import { AuthType, SigninType, SignupType } from "../auth";

export interface SignupRequest extends SignupType {
}

export interface SignupResponse {
  data: AuthType
}

export interface SigninRequest extends SigninType {
}

export interface SigninResponse extends AuthType {
  expiresIn: number,
  userId: BigInt,
  username: string
}