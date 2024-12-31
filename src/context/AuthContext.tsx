import React, { createContext, useState, useEffect } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: { fullname: string ,email :string} | null;
  login: (user: { fullname: string; email: string }) => void;
  logout: () => void;
  setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuthContext = (): AuthContextProps => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ fullname: string; email: string } | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      // Fetch user information using the token
      setIsAuthenticated(true);
      setUser({ fullname: 'John Doe', email: 'john.doe@example.com' }); // Replace with actual user data
    }
  }, []);

  const login = (user: { fullname: string; email: string }) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout ,setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};