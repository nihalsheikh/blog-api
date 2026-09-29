import { useEffect, useState } from "react";
import type { ReadingProgressBarProps } from "../types/components";

/**
 * A hairline progress bar pinned to the top of the viewport, filling as the
 * reader scrolls through the article.
 *
 * Measured against the article element rather than the document, so the bar
 * reaches 100% when the *post* is finished — a footer-heavy page would
 * otherwise leave it perpetually short.
 */
export default function ReadingProgressBar({
  targetRef,
}: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = targetRef.current;
      if (!el) return;

      const { top, height } = el.getBoundingClientRect();
      // Distance scrolled into the article, clamped to its full height.
      const scrolled = -top;
      const total = height - window.innerHeight;

      const pct = total > 0 ? (scrolled / total) * 100 : scrolled > 0 ? 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef]);

  if (progress <= 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 z-40 pointer-events-none"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-brand-400 to-brand-600 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
