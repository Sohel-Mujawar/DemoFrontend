import {AuthContextType} from '@/types';

export const INITIAL_AUTH_STATE: AuthContextType = {
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};
