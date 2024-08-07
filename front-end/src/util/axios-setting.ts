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
      // // Refresh 토큰을 보낼 경우 사용하고자 하는 커스텀 인증 헤더를 사용하면 된다.
      // if (refreshToken) {
      //   config.headers['x-refresh-token'] = refreshToken;
      // }

      return config;
    },
    (error) => {
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
        // response.config.headers = {
        //   authorization: `${newAccessToken}`,
        // };
      }
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status, data },
      } = error;
      console.log('0');
      console.log(error);
      if (status === 401 && data === 'InvalidTokenException') {
        console.log('1');
        interceptioLogout();
      }
      if (status === 401 && data.message === 'Access token is expired') {
        try {
          const jwt = localAxios();
          const refreshToken = localStorage.getItem('refreshToken');
          const toeknRefreshResult = await jwt.post(`/auth/login/refresh`, refreshToken, {
            headers: {
              'Content-Type': 'application/text',
            },
          });
          if (toeknRefreshResult.status === 200) {
            const { accessToekn, refreshToken } = toeknRefreshResult.data;
            localStorage.setItem('accessToken', accessToekn);
            localStorage.setItem('accessToken', refreshToken);
            return axios(config);
          } else {
            interceptioLogout();
          }
        } catch (e) {
          console.log(e);
          interceptioLogout();
        }
      }

      return Promise.reject(error);
    },
  );

  instance.defaults.headers.common['Authorization'] = '';
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers.patch['Content-Type'] = 'application/json';
  instance.defaults.headers.delete['Content-Type'] = 'application/html';
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
