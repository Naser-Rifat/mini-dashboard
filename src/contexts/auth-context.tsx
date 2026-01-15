"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthState, AuthContextType, AuthUser } from "@/types";

// Mock user data
const MOCK_USER: AuthUser = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "admin",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

const AUTH_STORAGE_KEY = "dashboard_auth_user";

// Auth reducer
type AuthAction =
  | { type: "LOADING" }
  | { type: "SUCCESS"; user: AuthUser }
  | { type: "LOGOUT" }
  | { type: "RESTORE"; user: AuthUser | null };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "SUCCESS":
      return { user: action.user, isAuthenticated: true, isLoading: false };
    case "LOGOUT":
      return { user: null, isAuthenticated: false, isLoading: false };
    case "RESTORE":
      return {
        user: action.user,
        isAuthenticated: !!action.user,
        isLoading: false,
      };
    default:
      return state;
  }
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore auth from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      const user = stored ? JSON.parse(stored) : null;
      dispatch({ type: "RESTORE", user });
    } catch {
      dispatch({ type: "RESTORE", user: null });
    }
  }, []);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: "LOADING" });
    await new Promise((r) => setTimeout(r, 1000)); // Simulate delay

    if (!email || !password) {
      dispatch({ type: "LOGOUT" });
      throw new Error("Invalid credentials");
    }

    const user: AuthUser =
      email === "demo@example.com" && password === "password123"
        ? MOCK_USER
        : { ...MOCK_USER, email, name: email.split("@")[0] };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    document.cookie = "auth_token=mock_token; path=/; max-age=86400";
    dispatch({ type: "SUCCESS", user });
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
