import type { LoginFormState, SignupFormState } from "./pages";
import type { User } from "./api";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  /** `isDark` is a convenience for the places that branch on it directly. */
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  /**
   * Accepts the originating click event and uses it to place the circle
   * origin. `onClick={toggle}` — not `onClick={() => toggle()}` — so the
   * reveal emanates from the button rather than the viewport centre.
   */
  toggle: (event?: React.MouseEvent) => void;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  /** True until the stored session has been checked on first paint. */
  initialising: boolean;
  login: (form: LoginFormState) => Promise<void>;
  signup: (form: SignupFormState) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
}
