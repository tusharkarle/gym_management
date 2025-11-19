import React, { createContext, useContext, useState, useEffect } from 'react';
import { env } from '../config/env';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const loginTime = localStorage.getItem('loginTime');
    
    if (savedAuth === 'true' && loginTime) {
      const oneHourInMs = 60 * 60 * 1000; // 1 hour
      const currentTime = Date.now();
      const timeElapsed = currentTime - parseInt(loginTime);
      
      if (timeElapsed < oneHourInMs) {
        setIsAuthenticated(true);
      } else {
        // Session expired, clear storage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('loginTime');
      }
    }

    // Auto logout after 1 hour
    const checkSession = () => {
      const loginTime = localStorage.getItem('loginTime');
      if (loginTime) {
        const oneHourInMs = 60 * 60 * 1000;
        const currentTime = Date.now();
        const timeElapsed = currentTime - parseInt(loginTime);
        
        if (timeElapsed >= oneHourInMs) {
          logout();
        }
      }
    };

    const interval = setInterval(checkSession, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === env.loginUsername && password === env.loginPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('loginTime', Date.now().toString());
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginTime');
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}