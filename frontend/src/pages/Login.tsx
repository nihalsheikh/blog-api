import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Feather, Lock, Mail } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/axios";
import { LIMITS } from "../types";
import type { LoginFormState } from "../types/pages";

const EMPTY: LoginFormState = { email: "", password: "" };

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState<LoginFormState>(EMPTY);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Return the user to whatever protected page sent them here.
  const from =
    (location.state as { from?: string } | null)?.from ?? "/my/blogs";

  if (user) return <Navigate to={from} replace />;

  const update = (key: keyof LoginFormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;

    setError(null);
    setSubmitting(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Could not sign you in"));
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="absolute top-0 right-0 p-4 z-10">
        <ThemeToggle />
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-6 text-2xl font-semibold tracking-tight"
            >
              <span className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/25">
                <Feather size={19} strokeWidth={1.75} />
              </span>
              Narra
            </Link>
            <h1 className="font-[family-name:var(--font-display)] text-[1.9rem] leading-tight font-semibold tracking-[-0.015em]">
              Welcome back
            </h1>
            <p className="text-sm text-soft mt-2">
              Your stories are where you left them.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card p-6 space-y-4">
            {error && (
              <div
                role="alert"
                className="text-sm text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
              >
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
                />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  autoFocus
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="••••••••"
                  className="input pl-10 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-soft transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full mt-2"
            >
              {submitting ? "Signing in…" : "Sign in"}
              {!submitting && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="text-sm text-soft text-center mt-6">
            New to Narra?{" "}
            <Link
              to="/signup"
              className="text-brand-700 dark:text-brand-300 font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="text-xs text-faint text-center mt-8">
            Passwords are {LIMITS.password.min}–{LIMITS.password.max}{" "}
            characters.
          </p>
        </div>
      </div>
    </div>
  );
}
