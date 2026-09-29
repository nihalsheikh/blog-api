import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { NAV_ITEMS } from "./nav";
import { useAuth } from "../context/AuthContext";
import { initials } from "../utils/date";

/** Desktop sidebar. Hidden below `md` — MobileNav takes over there. */
export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 flex-col glass border-r border-[var(--surface-border)] z-30">
      <div className="px-5 py-5 border-b divider">
        <Logo />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Main">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            // "/home" is a prefix of nothing else, but Home the icon must
            // not stay lit on /home/anything either — `end` keeps it honest.
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-brand-500/15 to-brand-500/5 ring-1 ring-brand-500/20 text-brand-700 dark:text-brand-300"
                  : "text-soft hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
              }`
            }
          >
            <Icon size={18} strokeWidth={1.5} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 space-y-3 border-t divider">
        <ThemeToggle withLabel />

        {user && (
          <div className="flex items-center gap-3 px-1 pt-1">
            <span
              className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold shrink-0 shadow-md shadow-brand-600/30"
              aria-hidden="true"
            >
              {initials(user.name)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted truncate">{user.email}</p>
            </div>
            <button
              className="btn-ghost p-2 text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 shrink-0"
              onClick={() => {
                logout();
                navigate("/");
              }}
              aria-label="Log out"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
