import type { LoadingSpinnerProps } from "../types/components";

/**
 * The house spinner: a 2px neutral track with a brand-coloured leading
 * edge. `full` switches between a bare spinner and a centred full-screen one.
 *
 * Every spinner in the app is paired with a text label — a bare spinner
 * inside a button is never acceptable. `label` is that text: announced to
 * screen readers, and shown as a caption when the spinner isn't full-screen.
 * A label-less spinner (inside a button) keeps the bare markup.
 */
export default function LoadingSpinner({
  size = 24,
  full = false,
  label,
  className = "",
}: LoadingSpinnerProps) {
  const spinner = (
    <div
      className={`border-2 border-ink-200 dark:border-white/10 border-t-brand-600 rounded-full animate-spin shrink-0 ${
        full ? "w-8 h-8" : ""
      } ${className}`}
      style={full ? undefined : { width: size, height: size }}
      role="status"
      aria-label={label ?? "Loading"}
    />
  );

  if (!full) {
    if (!label) return spinner;
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        {spinner}
        <p className="text-sm text-muted">{label}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 animate-fade-in">
      {spinner}
      {label && <p className="text-sm text-muted">{label}</p>}
    </div>
  );
}
