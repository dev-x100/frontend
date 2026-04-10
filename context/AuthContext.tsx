"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { authApi, type User } from "@/lib/api";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("td_token");
    if (stored) {
      setToken(stored);
      authApi
        .me()
        .then(({ user }) => setUser(user))
        .catch(() => {
          localStorage.removeItem("td_token");
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const persist = (tkn: string, usr: User) => {
    localStorage.setItem("td_token", tkn);
    setToken(tkn);
    setUser(usr);
  };

  const login = useCallback(async (email: string, password: string) => {
    const { token: tkn, user: usr } = await authApi.login(email, password);
    persist(tkn, usr);
    // Role-based redirect
    router.push(usr.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
  }, [router]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { token: tkn, user: usr } = await authApi.register(name, email, password);
    persist(tkn, usr);
    router.push("/dashboard");
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("td_token");
    setToken(null);
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
