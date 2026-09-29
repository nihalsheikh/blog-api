import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { flushSync } from "react-dom";
import type { ReactNode } from "react";
import type { Theme, ThemeContextType } from "../types/context";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme";

/** Resolve the initial theme: saved preference → OS preference → light. */
function getInitialTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Keep the <html> class and localStorage in sync with state.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Follow the OS only while the user hasn't made an explicit choice.
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      setThemeState(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);

  /**
   * The circular view transition.
   *
   * 1. Bail to a plain state update if the theme is unchanged, the API is
   *    unsupported, or the user prefers reduced motion.
   * 2. Compute the origin from the clicked button's centre, so the reveal
   *    emanates from the toggle rather than the middle of the screen.
   * 3. Start the view transition and flush the React update inside it.
   *    `flushSync` is essential — without it React batches the update to a
   *    later microtask and the transition captures the old frame only.
   * 4. Once `ready`, animate the new root's clip-path from a zero-radius
   *    circle to one large enough to cover the farthest viewport corner.
   */
  const toggle = useCallback(
    (event?: React.MouseEvent) => {
      const next: Theme = theme === "dark" ? "light" : "dark";

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (
        !document.startViewTransition ||
        prefersReducedMotion
      ) {
        setThemeState(next);
        return;
      }

      // Origin: the button's centre, then the click point, then the centre
      // of the viewport.
      let x: number;
      let y: number;

      if (event && event.currentTarget instanceof HTMLElement) {
        const rect = event.currentTarget.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if (event) {
        x = event.clientX;
        y = event.clientY;
      } else {
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
      }

      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      const transition = document.startViewTransition(() => {
        flushSync(() => setThemeState(next));
      });

      transition.ready.then(() => {
        document
          .documentElement
          .animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 500,
              easing: "ease-in-out",
              // The pseudo-element would otherwise snap back to no clip
              // once the transition ends.
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)",
            },
          );
      });
    },
    [theme],
  );

  const value = useMemo(
    () => ({ theme, isDark: theme === "dark", setTheme, toggle }),
    [theme, setTheme, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
