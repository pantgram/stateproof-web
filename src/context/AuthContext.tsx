import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { UserMeResponse } from "@/lib/types";
import api, { setAccessToken, getAccessToken } from "@/lib/api";
import { setRefreshToken, getRefreshToken, clearRefreshToken } from "@/lib/auth";
import { refreshAccessToken } from "@/lib/api";

interface AuthContextType {
  user: UserMeResponse | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserMeResponse | null>(null);
  const [token, setToken] = useState<string | null>(() => getAccessToken());
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((at: string, rt: string) => {
    setAccessToken(at);
    setRefreshToken(rt);
    setToken(at);
  }, []);

  const logout = useCallback(async () => {
    const rt = getRefreshToken();
    try {
      if (rt) {
        await api.post("/api/v1/auth/revoke", { refresh_token: rt });
      }
    } catch {
      // ignore
    }
    setAccessToken(null);
    clearRefreshToken();
    setToken(null);
    setUser(null);
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await api.get<UserMeResponse>("/api/v1/auth/me");
      setUser(data);
    } catch {
      setAccessToken(null);
      clearRefreshToken();
      setToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser().finally(() => setIsLoading(false));
    } else if (getRefreshToken()) {
      refreshAccessToken()
        .then((newToken) => {
          if (newToken) {
            setToken(newToken);
          } else {
            setIsLoading(false);
          }
        })
        .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken: token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
