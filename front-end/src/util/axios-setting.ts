import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
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
      if (refreshToken) {
        config.headers['RefreshToken'] = refreshToken;
      }

      return config;
    },
    (error) => {
      console.log('리퀘스트 오류');
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    async (response: AxiosResponse) => {
      console.log('인터셉트 리스폰');
      if (response.headers.authorization) {
        console.log('토큰있나?');
        const newAccessToken = response?.headers?.authorization;
        localStorage.removeItem('accessToken'); // 만료된 access토큰 삭제
        localStorage.setItem('accessToken', newAccessToken); // 새걸로 교체
      }
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status, data },
      } = error;
      console.log('리스폰 오류');
      console.log(error);
      if (status === 401 && data === 'Refresh token is expired, logged out') {
        console.log('리프 파괴');
        // interceptioLogout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      if (status === 401 && data === 'Access token is expired') {
        try {
          console.log('액세 파괴');
          const jwt = localAxios();
          const refreshToken = localStorage.getItem('refreshToken');
          const toeknRefreshResult = await jwt.post(`/auth/login/refresh`, refreshToken, {
            headers: {
              'Content-Type': 'application/text',
            },
          });
          if (toeknRefreshResult.status === 200) {
            console.log('액세스 리프 교체');
            const { accessToken, refreshToken } = toeknRefreshResult.data;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            console.log('교체완료');
            return axios(config);
          } else {
            console.log('요청했지만 200이 아님');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        } catch (e) {
          console.log('요청실패');
          console.log(e);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }

      return Promise.reject(error);
    },
  );

  instance.defaults.headers.common['Authorization'] = '';
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers.patch['Content-Type'] = 'application/json';
  instance.defaults.headers.put['Content-Type'] = 'application/json';
  return instance;
};

export const publicAxios = () => {
  const publicAxios: Axios = axios.create({
    baseURL: '/proxy',
    withCredentials: true,
  });

  publicAxios.defaults.headers.common['Authorization'] = '';
  publicAxios.defaults.headers.post['Content-Type'] = 'application/json';
  publicAxios.defaults.headers.patch['Content-Type'] = 'application/json';
  return publicAxios;
};
