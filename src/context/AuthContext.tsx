import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  name?: string;
  phone?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoginOpen: boolean;
  setLoginOpen: (open: boolean) => void;
  isSignupOpen: boolean;
  setSignupOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("revelle_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem("revelle_user");
      }
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("revelle_user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    setLoginOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("revelle_user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoginOpen,
        setLoginOpen,
        isSignupOpen,
        setSignupOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
