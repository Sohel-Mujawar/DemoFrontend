import {INITIAL_AUTH_STATE} from '@/lib/contants';
import {AuthContextType} from '@/types';
import {createContext, useContext} from 'react';

export const AuthContext = createContext<AuthContextType>(INITIAL_AUTH_STATE);

export const useAuthContext = () => useContext(AuthContext);
