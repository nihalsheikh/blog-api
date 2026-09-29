import { Clock } from "lucide-react";

/**
 * A real story rendered in the real reading surface.
 *
 * This is the landing page's hero. Rather than illustrate the product, it
 * *is* the product: the same Fraunces body, the same measure, the same
 * drop cap, the same hairline above the title. Nothing here is a mockup of
 * the reading view — it's the reading view.
 */
export default function ArticleSpecimen() {
  return (
    <figure className="relative">
      {/* A second sheet behind the first, offset — the desk the page rests on. */}
      <div
        aria-hidden="true"
        className="absolute -top-3 -right-3 inset-x-4 bottom-3 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)]"
      />

      <div className="relative glass-strong rounded-2xl shadow-[var(--shadow-lift)] overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700" />

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
            <span>Essay</span>
            <span aria-hidden="true" className="text-faint">
              ·
            </span>
            <span className="flex items-center gap-1.5 font-normal normal-case tracking-normal">
              <Clock size={11} aria-hidden="true" />
              6 min read
            </span>
          </div>

          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[1.75rem] sm:text-[2rem] leading-[1.15] tracking-[-0.018em] font-semibold text-[var(--text)]">
            The quiet cost of always being available
          </h2>

          <div className="mt-4 flex items-center gap-2.5 text-xs text-muted">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-[0.625rem] font-semibold flex items-center justify-center shrink-0">
              R
            </span>
            <span>Rhea Okonjo</span>
            <span aria-hidden="true" className="text-faint">
              ·
            </span>
            <span>March 2026</span>
          </div>

          <div className="mt-6 h-px divider" />

          {/* The real reading classes — same measure, same leading, same cap. */}
          <div className="prose-narra mt-6 font-[family-name:var(--font-display)] text-[1.0625rem] leading-[1.75]">
            <p>
              {/* `.prose-narra` only drops the cap at ≥640px, and this column
                  is narrower than that on mobile — so the hero card sets its
                  own, and the media query would otherwise re-apply a second. */}
              <span className="float-left font-[family-name:var(--font-display)] text-[3.4em] leading-[0.82] font-semibold pr-[0.08em] text-brand-600 dark:text-brand-300">
                W
              </span>
              e built a culture that expects an answer in minutes. The bill
              arrives later, and it compounds.
            </p>
            <p className="line-clamp-4">
              There is a version of reliability that looks like virtue and
              behaves like a debt. You answer at eleven at night because the
              alternative feels like abandonment. You are unreachable for a
              weekend because you said you would be. Nobody names the cost,
              because naming it would mean renegotiating.
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
