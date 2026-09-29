import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import type { ThemeToggleProps } from "../types/components";

/**
 * The icon always shows the *target* state: a sun while dark (click → light),
 * a moon while light. The click event is passed straight through so the
 * circular reveal starts at the button's centre.
 */
export default function ThemeToggle({ withLabel = false }: ThemeToggleProps) {
  const { isDark, toggle } = useTheme();
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      onClick={toggle}
      className={
        withLabel
          ? "btn-secondary w-full justify-start"
          : "btn-ghost p-2"
      }
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      {withLabel && <span>Switch theme</span>}
    </button>
  );
}
