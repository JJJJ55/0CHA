import { AxiosError, AxiosResponse } from 'axios';
import { localAxios } from '../../util/axios-setting';
import { request } from './index';
import { AuthCheck, FindEmail, FindPwAuth, ResetPw, SignupType, Token, UserLogin } from '../../util/types/axios-user';

const local = localAxios();

interface UserInfo {
  id: number;
  name: string;
  email: string;
  nickname: string;
  phone: string;
  birth: Date;
  profileImageUrl: string;
  gender: number;
  height: number;
  weight: number;
  district: string;
  siGunGu: string;
}

export const login = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/auth/login/login`, param).then(success).catch(fail);
};

export const logout = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/auth/login/logout`).then(success).catch(fail);
};

// AT 재발급 고려중(axios intercept에 적용)

// 소셜로그인

// 소셜로그인 토큰

export const findEmail = async (
  param: FindEmail,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/auth/modify/find-email`, param).then(success).catch(fail);
};

export const findPwAuth = async (
  param: FindPwAuth,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/auth/modify/find-password`, param).then(success).catch(fail);
};

export const findPwAuthCheck = async (
  param: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/auth/modify/find-password/verify`, param).then(success).catch(fail);
};

export const resetPw = async (param: ResetPw, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.put(`/auth/modify/reset-password`, param).then(success).catch(fail);
};

export const emailAuth = async (param: string, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/auth/register/check-email`, param).then(success).catch(fail);
};

export const emailAuthCheck = async (
  param: AuthCheck,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/auth/register/check-email/verify`, param).then(success).catch(fail);
};

export const nickCheck = async (param: string, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/auth/register/check-nickname`, param).then(success).catch(fail);
};

export const signup = async (
  param: SignupType,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/auth/register/signup`, param).then(success).catch(fail);
};
// export const user = {
//   login: (param: UserLogin) => request.post<Token>('/auth/login/login', param).then().catch(),
//   info: () => request.get<UserInfo>('/main/user_info'),
// };
