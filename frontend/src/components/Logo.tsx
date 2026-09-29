import { Link } from "react-router-dom";
import type { LogoProps } from "../types/components";

/**
 * The wordmark. A flat ember tile with an "N" in Fraunces, plus the name in
 * semibold with `tracking-tight` — never bold. The serif mark is the tell that
 * this is a writing product and not a dashboard.
 */
export default function Logo({ size = "md", withText = true }: LogoProps) {
  const tile = size === "sm" ? "w-8 h-8 rounded-lg" : "w-9 h-9 rounded-xl";
  const glyph = size === "sm" ? "text-sm" : "text-base";
  const word = size === "sm" ? "text-base" : "text-lg";

  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Narra home">
      <span
        className={`${tile} bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-600/30`}
      >
        <span
          className={`${glyph} font-[family-name:var(--font-display)] text-white leading-none tracking-tight`}
        >
          N
        </span>
      </span>
      {withText && (
        <span className={`${word} font-semibold tracking-tight`}>Narra</span>
      )}
    </Link>
  );
}
