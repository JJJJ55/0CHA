import { AxiosError, AxiosResponse } from 'axios';
import { localAxios } from '../../util/axios-setting';
import { request } from './index';

const local = localAxios();

interface LoginType {
  email: string;
  password: string;
}
export const login = async (param: LoginType, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/auth/login/`, param).then(success).catch(fail);
};

export const user = {
  login: (email: string, password: string) => request.post<LoginType>('/auth/login/', { email, password }),
};
