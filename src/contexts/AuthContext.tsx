import React from "react";
import { AuthUser } from "../services/types";

const USER_KEY = "medtrack_user";

interface AuthContextValue {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = React.useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });

  const setUser = (newUser: AuthUser | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
