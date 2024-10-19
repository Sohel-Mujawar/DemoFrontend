import {ReactNode, useEffect, useState} from 'react';
import {AuthContext} from './AuthContext';
import {Token, User} from '@/types';
import {QUERY_KEYS} from '@/lib/react-query/QueryKeys';
import {jwtDecode} from 'jwt-decode';

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>();
  const [token, setToken] = useState<Token | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const localToken = JSON.parse(
      localStorage.getItem(QUERY_KEYS.TOKEN) || 'null',
    );

    if (localToken) {
      const decodedToken: User = jwtDecode(localToken.accessToken);

      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem(QUERY_KEYS.TOKEN);
        setToken(null);
        setUser(null);
        setRole(null);
        setIsSuperAdmin(false);
        setIsAuthenticated(false);
      } else {
        setToken(localToken);
        setUser(decodedToken);
        setRole(decodedToken.role);
        setIsSuperAdmin(decodedToken.role === 'SuperAdmin');
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Value of the context
  const contextValue = {
    user,
    setUser,
    role,
    token,
    setToken,
    isAuthenticated,
    setIsAuthenticated,
    isSuperAdmin,
    setIsSuperAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
