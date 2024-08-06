import axios, { Axios, AxiosRequestConfig } from 'axios';
import { logout } from '../lib/api/user-api';

export const localAxios = () => {
  const instance: Axios = axios.create({
    baseURL: '/proxy',
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      console.log('인터셉트 리퀘스트');
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken) {
        config.headers['Authorization'] = `${accessToken}`;
      }
      // Refresh 토큰을 보낼 경우 사용하고자 하는 커스텀 인증 헤더를 사용하면 된다.
      if (refreshToken) {
        config.headers['x-refresh-token'] = refreshToken;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    async (response) => {
      console.log('인터셉트 리스폰');
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status, data },
      } = error;

      if (status === 401 && data.message === 'InvalidTokenException') {
        interceptioLogout();
      }
      if (status === 401 && data.message === 'TokenExpired') {
        try {
          const toeknRefreshResult = await axios.post(`/auth/login/refresh`);
          if (toeknRefreshResult.status === 200) {
            const { accessToekn } = toeknRefreshResult.data;
            localStorage.setItem('accessToken', accessToekn);
            return axios(config);
          } else {
            interceptioLogout();
          }
        } catch (e) {
          interceptioLogout();
        }
      }

      return Promise.reject(error);
    },
  );

  instance.defaults.headers.common['Authorization'] = '';
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers.patch['Content-Type'] = 'application/json';
  return instance;
};

const interceptioLogout = async () => {
  await logout(
    (resp) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    (error) => {
      console.log('intercept 로그아웃 에러 ' + error);
    },
  );
};
