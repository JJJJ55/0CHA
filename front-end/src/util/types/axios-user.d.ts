export interface Token {
  accessToken: string;
  refreshToken: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export interface FindEmail {
  name: string;
  phone: string;
}

export interface FindPwAuth {
  email: string;
  name: string;
  phone: string;
}

export interface AuthCheck {
  email: string;
  authCode: string;
}

export interface ResetPw {
  email: string;
  password: string;
}

export interface SignupType {
  email: string;
  password: string;
  name: string;
  nickname: string;
  phone: string;
  birth: string;
}
