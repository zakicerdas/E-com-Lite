import React, { createContext, useState, type ReactNode, useEffect, useContext } from "react";

interface Profile {
  username: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  profile: Profile | null;
  login: (payload: { username: string; password: string; avatar?: string  }) => void;
  logout: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
}

const STORAGE_KEY = "AUTH_CONTEXT";

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  profile: null,
  login: () => {},
  logout: () => {},
  updateProfile: () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Profile;
        setProfile(parsed);
      }
    } catch {
      
    }
  }, []);

  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [profile]);

  const login = (payload: { username: string; password: string; avatar?: string }) => {
    setProfile({ username: payload.username, avatar: payload.avatar });
  };

  const logout = () => {
    setProfile(null);
  };

  const updateProfile = (patch: Partial<Profile>) => {
    setProfile((prev) => {
      if (!prev) return prev;
      return { ...prev, ...patch };
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!profile, profile, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);