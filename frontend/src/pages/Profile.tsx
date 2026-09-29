import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Feather,
  LogOut,
  Moon,
  PenSquare,
  Settings,
  Sun,
  Trash2,
} from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import { fetchMyBlogs } from "../api/blogs";
import { getErrorMessage } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { formatDate, initials } from "../utils/date";

export default function Profile() {
  const { user, logout, deleteAccount } = useAuth();
  const { theme, isDark, setTheme, toggle } = useTheme();
  const navigate = useNavigate();

  const [storyCount, setStoryCount] = useState<number | null>(null);
  const [countError, setCountError] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchMyBlogs(1, 1, undefined)
      .then((data) => {
        if (cancelled) return;
        setCountError(null);
        setStoryCount(data.total);
      })
      .catch((err) => {
        // A failed count shouldn't break the page — it's a single stat.
        if (cancelled) return;
        setStoryCount(0);
        setCountError(getErrorMessage(err, "Couldn't count your stories"));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  async function handleDeleteAccount() {
    if (deleting) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteAccount();
      navigate("/", { replace: true });
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Something went wrong");
      setDeleting(false);
      setConfirmingDelete(false);
    }
  }

  if (!user) return null;

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-[2.1rem] leading-tight font-semibold tracking-[-0.018em]">
          Profile
        </h1>
        <p className="text-sm text-soft mt-1.5">Your account and how it reads.</p>
      </header>

      {/* ---------- Identity ---------- */}
      <section className="card p-6 mb-5">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-xl font-semibold shrink-0 shadow-lg shadow-brand-600/25"
            aria-hidden="true"
          >
            {initials(user.name)}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-tight truncate">
              {user.name}
            </h2>
            <p className="text-sm text-muted truncate">{user.email}</p>
            <p className="text-xs text-faint mt-1">
              Writing here since {formatDate(user.created_at, { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t divider">
          <div className="text-center">
            {countError ? (
              <>
                <p className="text-2xl font-semibold tracking-tight text-muted">
                  —
                </p>
                <p className="text-xs text-rose-500 mt-0.5" role="status">
                  {countError}
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-semibold tracking-tight">
                  {storyCount ?? "—"}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {storyCount === 1 ? "story" : "stories"}
                </p>
              </>
            )}
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold tracking-tight">
              {isDark ? "Dark" : "Light"}
            </p>
            <p className="text-xs text-muted mt-0.5">current theme</p>
          </div>
        </div>
      </section>

      {/* ---------- Quick actions ---------- */}
      <section className="card p-2 mb-5">
        <Link
          to="/write"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-500/5 transition group"
        >
          <span className="w-9 h-9 rounded-lg bg-brand-500/15 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0">
            <PenSquare size={17} strokeWidth={1.5} />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-medium">Write a story</span>
            <span className="block text-xs text-muted">
              Start something new
            </span>
          </span>
        </Link>

        <Link
          to="/my/blogs"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-500/5 transition"
        >
          <span className="w-9 h-9 rounded-lg bg-brand-500/15 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0">
            <BookOpen size={17} strokeWidth={1.5} />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-medium">My stories</span>
            <span className="block text-xs text-muted">
              Read, edit, or remove what you've written
            </span>
          </span>
        </Link>
      </section>

      {/* ---------- Appearance ---------- */}
      <section className="card p-6 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Settings size={16} className="text-faint" />
          <h2 className="text-sm font-semibold tracking-tight">Appearance</h2>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-soft">
            Narra remembers your choice on this device.
          </p>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surface-hover)]">
            {(["light", "dark"] as const).map((option) => {
              const active = theme === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTheme(option)}
                  aria-pressed={active}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
                    active
                      ? "bg-[var(--surface-strong)] text-[var(--text)] shadow-sm"
                      : "text-muted hover:text-soft"
                  }`}
                >
                  {option === "light" ? (
                    <Sun size={13} strokeWidth={1.75} />
                  ) : (
                    <Moon size={13} strokeWidth={1.75} />
                  )}
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Session ---------- */}
      <section className="card p-6 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Feather size={16} className="text-faint" />
          <h2 className="text-sm font-semibold tracking-tight">Session</h2>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-soft">
            Signed in on this device.{" "}
            <button
              type="button"
              onClick={toggle}
              className="text-brand-700 dark:text-brand-300 font-medium hover:underline"
            >
              Flip to {isDark ? "light" : "dark"}
            </button>{" "}
            to watch the transition again.
          </p>
          <button onClick={handleLogout} className="btn-secondary">
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </section>

      {/* ---------- Danger zone ---------- */}
      <section className="card p-6 border-rose-500/25">
        <h2 className="text-sm font-semibold tracking-tight text-rose-500">
          Danger zone
        </h2>
        <p className="text-sm text-soft mt-1.5 leading-relaxed">
          Deleting your account removes your profile. Stories already
          published stay on Narra, but you'll have no way to edit or remove
          them.
        </p>
        <button
          onClick={() => setConfirmingDelete(true)}
          className="btn-danger mt-4"
        >
          <Trash2 size={15} />
          Delete account
        </button>
      </section>

      <ConfirmDialog
        open={confirmingDelete}
        title="Delete your account?"
        description={`This signs you out of ${user.email} and permanently removes your profile. It cannot be undone.`}
        confirmLabel="Delete account"
        busy={deleting}
        error={deleteError ?? undefined}
        onConfirm={handleDeleteAccount}
        onClose={() => setConfirmingDelete(false)}
      />
    </div>
  );
}
