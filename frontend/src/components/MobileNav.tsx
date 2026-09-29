import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./nav";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { initials } from "../utils/date";

/**
 * Mobile chrome: a sticky glass top bar and a fixed glass bottom tab bar.
 * Both are hidden at `md` and above, where the sidebar takes over.
 */
export default function MobileNav() {
  const { user } = useAuth();

  return (
    <>
      <header className="md:hidden sticky top-0 z-30 glass border-b border-[var(--surface-border)] px-4 py-3 flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user && (
            <NavLink
              to="/profile"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center text-xs font-semibold"
              aria-label="Profile"
            >
              {initials(user.name)}
            </NavLink>
          )}
        </div>
      </header>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 glass border-t border-[var(--surface-border)] px-2 pb-[env(safe-area-inset-bottom)]"
        aria-label="Main"
      >
        <div className="grid grid-cols-4">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition ${
                  isActive
                    ? "text-brand-700 dark:text-brand-300"
                    : "text-faint"
                }`
              }
            >
              <Icon size={20} strokeWidth={1.5} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
