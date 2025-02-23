import {QUERY_KEYS} from '@/lib/react-query/QueryKeys';
import {Token, User} from '@/types';
import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {jwtDecode} from 'jwt-decode';

export const unAuthenticatedApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

// Get the token from localStorage
let token: Token | null = JSON.parse(
  localStorage.getItem(QUERY_KEYS.TOKEN) || 'null',
);

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    Authorization: token ? `Bearer ${token.accessToken}` : '',
  },
});

api.interceptors.request.use(async (req) => {
  // Refresh token if it has expired
  if (!token) {
    token = JSON.parse(localStorage.getItem(QUERY_KEYS.TOKEN) || 'null');
    if (token) {
      req.headers.Authorization = `Bearer ${token.accessToken}`;
    }
  }

  // if (token) {
  //   const user: User = jwtDecode(token.accessToken || '');
  //   const isExpired = user.exp && user.exp * 1000 < Date.now();

  //   if (isExpired) {
  //     try {
  //       const res = await unAuthenticatedApi.post('/users/refresh-token', {
  //         refreshToken: token.refreshToken,
  //       });

  //       localStorage.setItem(
  //         QUERY_KEYS.TOKEN,
  //         JSON.stringify({
  //           accessToken: res.data.accessToken,
  //           refreshToken: res.data.refreshToken,
  //         }),
  //       );
  //       req.headers.Authorization = `Bearer ${res.data.accessToken}`;
  //       token = {
  //         accessToken: res.data.accessToken,
  //         refreshToken: res.data.refreshToken,
  //       };
  //     } catch (error) {
  //       console.error('Token refresh failed:', error);
  //       localStorage.removeItem(QUERY_KEYS.TOKEN);
  //     }
  //   }
  // }

  return req;
});

api.interceptors.response.use(
  async (res: AxiosResponse) => {
    return res.data;
  },
  (error: AxiosError<unknown>) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized:', error.response.data);
    } else if (error.response?.status === 403) {
      console.error('Forbidden:', error.response.data);
    } else if (error.response?.status === 404) {
      console.error('Not found:', error.response.data);
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    } else {
      console.error('Error:', error.response?.data);
    }

    return Promise.reject(error);
  },
);
