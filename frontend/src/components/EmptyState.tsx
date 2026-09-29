import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  headline: string;
  description: string;
  action?: ReactNode;
}

/**
 * The house empty state. Icon → headline → supporting line → optional CTA.
 * The supporting copy always tells the user what to do next.
 */
export default function EmptyState({
  icon: Icon,
  headline,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="card p-10 text-center">
      <div className="w-14 h-14 rounded-2xl bg-brand-500/15 text-brand-600 dark:text-brand-300 flex items-center justify-center mx-auto mb-4">
        <Icon size={26} strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{headline}</h3>
      <p className="text-sm text-muted mt-1.5 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Inline form-level error. Feedback is inline — there is no toast system. */
export function ErrorBanner({
  message,
  onRetry,
  retryLabel = "Retry",
}: {
  message: string;
  /** When supplied, offers a retry affordance beside the message. */
  onRetry?: () => void;
  retryLabel?: string;
}) {
  return (
    <div
      role="alert"
      className="text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2 flex items-start gap-2"
    >
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 font-medium underline underline-offset-2 hover:brightness-110"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}
