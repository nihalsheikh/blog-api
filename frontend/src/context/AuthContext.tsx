import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import api, { getErrorMessage } from "../api/axios";
import type { AuthContextType } from "../types/context";
import type { LoginFormState, SignupFormState } from "../types/pages";
import type { LoginResponse, MessageResponse, User } from "../types/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // Guards the protected-route check so we don't redirect before we've
  // finished reading localStorage.
  const [initialising, setInitialising] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser) as User);
      } catch {
        // Corrupt entry in storage — clear it rather than crash on boot.
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setInitialising(false);
  }, []);

  const login = useCallback(async ({ email, password }: LoginFormState) => {
    /**
     * The login route takes OAuth2PasswordRequestForm, so the body must be
     * form-encoded and the email goes in the `username` field. Sending JSON
     * here returns a 422.
     */
    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);

    const { data } = await api.post<LoginResponse>("/login", body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    localStorage.setItem("token", data.access_token);

    // The login response carries no user, so the profile is fetched with the
    // freshly-issued token to populate the session.
    const { data: profile } = await api.get<{ user: User }>("/profile");
    localStorage.setItem("user", JSON.stringify(profile.user));

    setToken(data.access_token);
    setUser(profile.user);
  }, []);

  const signup = useCallback(
    async ({ name, email, password }: SignupFormState) => {
      // Signup returns 201 with the user but no token — sign in right after.
      await api.post("/signup", { name, email, password });
      await login({ email, password });
    },
    [login],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  const deleteAccount = useCallback(async () => {
    try {
      await api.delete<MessageResponse>("/profile");
    } catch (error) {
      // Surface real failures, but still clear the local session either way
      // so a half-deleted account can't leave the app in a broken state.
      const message = getErrorMessage(error, "Couldn't delete your account.");
      logout();
      throw new Error(message);
    }
    logout();
  }, [logout]);

  const value = useMemo(
    () => ({
      user,
      token,
      initialising,
      login,
      signup,
      logout,
      deleteAccount,
    }),
    [user, token, initialising, login, signup, logout, deleteAccount],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
