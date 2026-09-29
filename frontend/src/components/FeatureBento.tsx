import { Lock } from "lucide-react";

/**
 * A dramatic bento grid: 6 tiles in a 3x2 rectangle.
 * Middle tile: animated solar system with "N" at center,
 * orbited by product-related icons.
 */
export default function FeatureBento() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[320px]">
      {/* ---- ROW 1, COL 1: PUBLISH ---- */}
      <article
        className="rounded-2xl overflow-hidden relative group/publish animate-fade-in card-hover"
        style={{
          animationDelay: "0s",
          background:
            "linear-gradient(135deg, rgba(13,148,136,0.15) 0%, rgba(13,148,136,0.05) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover/publish:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-brand-500/20 via-transparent to-brand-700/10" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/30 rounded-full blur-3xl opacity-0 group-hover/publish:opacity-100 transition-opacity duration-700" />

        <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
          <div>
            <span className="inline-block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-500 mb-3">
              Publish
            </span>
            <h3 className="text-lg sm:text-xl font-[family-name:var(--font-display)] font-semibold leading-tight">
              Write. Post. Done.
            </h3>
          </div>

          <div className="space-y-1.5">
            <div className="font-[family-name:var(--font-mono)] text-[0.7rem] text-brand-400">
              <span className="text-faint">// </span>
              <span className="text-brand-300">title</span>
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[0.7rem] text-brand-400">
              <span className="text-faint">// </span>
              <span className="text-brand-400">The quiet cost of always</span>
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[0.7rem] text-brand-400 line-clamp-2">
              <span className="text-faint">// </span>
              <span className="text-brand-300">We built a culture...</span>
            </div>
            <div className="pt-2 flex gap-2">
              <div className="px-2.5 py-1 rounded-lg bg-brand-600/80 text-white text-[0.6rem] font-medium">
                publish()
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ---- ROW 1, COL 2: SEARCH ---- */}
      <article
        className="rounded-2xl overflow-hidden relative group/search animate-fade-in card-hover"
        style={{
          animationDelay: "0.1s",
          background:
            "linear-gradient(135deg, rgba(15,118,110,0.2) 0%, rgba(45,212,191,0.05) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover/search:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-brand-500/15 via-transparent to-brand-600/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover/search:opacity-100 transition-opacity duration-700" />

        <div className="relative h-full flex flex-col justify-between p-6">
          <div>
            <span className="inline-block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-500 mb-3">
              Search
            </span>
            <h3 className="text-lg font-[family-name:var(--font-display)] font-semibold leading-tight">
              Find it by name
            </h3>
          </div>

          <div className="space-y-2">
            {["Notes on a slower", "Reading, more slowly"].map((title, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg border border-brand-500/20 bg-brand-950/40 backdrop-blur-sm text-[0.7rem] animate-slide-up"
                style={{
                  animationDelay: `${0.15 * (i + 1)}s`,
                }}
              >
                <div className="text-brand-200 truncate">{title}</div>
                <div className="text-[0.6rem] text-brand-400/70 mt-0.5">
                  {i === 0 ? "Feb 2026" : "Jan 2026"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* ---- ROW 1, COL 3: READING ---- */}
      <article
        className="rounded-2xl overflow-hidden relative group/read animate-fade-in card-hover"
        style={{
          animationDelay: "0.2s",
          background:
            "linear-gradient(135deg, rgba(13,148,136,0.1) 0%, rgba(13,148,136,0.02) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover/read:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-brand-400/10 via-transparent to-brand-700/5" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-brand-500/20 rounded-full blur-3xl opacity-0 group-hover/read:opacity-100 transition-opacity duration-700" />

        <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
          <div>
            <span className="inline-block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-500 mb-3">
              Reading
            </span>
            <h3 className="text-lg sm:text-xl font-[family-name:var(--font-display)] font-semibold leading-tight">
              Built for long reads
            </h3>
          </div>

          <div className="font-[family-name:var(--font-display)] text-sm leading-relaxed">
            <span className="float-left text-3xl font-semibold leading-[0.75] pr-2 text-brand-500">
              T
            </span>
            <span className="text-faint text-[0.85rem]">
              here was a period when the shape of a page told you what kind of
              page it was.
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-1 bg-brand-950/20 rounded-full overflow-hidden">
              <div className="h-full w-[45%] bg-gradient-to-r from-brand-400 to-brand-600 rounded-full" />
            </div>
            <div className="text-[0.65rem] text-faint">45% • 2,847 words • 6 min</div>
          </div>
        </div>
      </article>

      {/* ---- ROW 2, COL 1: INSPIRATION ---- */}
      <article
        className="rounded-2xl overflow-hidden relative group/inspire animate-fade-in card-hover"
        style={{
          animationDelay: "0.25s",
          background:
            "linear-gradient(135deg, rgba(94,234,212,0.15) 0%, rgba(13,148,136,0.05) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover/inspire:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-brand-400/20 via-transparent to-brand-500/10" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-300/30 rounded-full blur-2xl opacity-0 group-hover/inspire:opacity-100 transition-opacity duration-700" />

        <div className="relative h-full flex flex-col justify-between p-6">
          <div>
            <span className="inline-block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-500 mb-3">
              Inspiration
            </span>
            <h3 className="text-lg font-[family-name:var(--font-display)] font-semibold leading-tight">
              Start anywhere
            </h3>
          </div>

          <div className="space-y-3">
            {[
              "write freely",
              "find later",
              "share widely",
              "keep yours",
            ].map((word, i) => (
              <div
                key={i}
                className="font-[family-name:var(--font-display)] text-sm text-brand-300 font-semibold animate-fade-in"
                style={{
                  animation: `fade-in 0.6s ease-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                  animationPlayState: "running",
                }}
              >
                → {word}
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* ---- ROW 2, COL 2: SOLAR SYSTEM (NARRA ORBIT) ---- */}
      <article
        className="rounded-2xl overflow-hidden relative group/orbit animate-fade-in card-hover"
        style={{
          animationDelay: "0.3s",
          background:
            "linear-gradient(135deg, rgba(13,148,136,0.12) 0%, rgba(13,148,136,0.03) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover/orbit:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-brand-500/15 via-transparent to-brand-600/8" />

        <div className="relative h-full flex items-center justify-center overflow-hidden">
          {/* Center N logo */}
          <div className="absolute z-10 flex items-center justify-center w-14 h-14 rounded-full border-2 border-brand-400 bg-brand-500/25 animate-pulse">
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              N
            </span>
          </div>

          {/* Orbital rings. The inner one is the path the icons ride. */}
          <div className="absolute w-36 h-36 border border-dashed border-brand-500/30 rounded-full" />
          <div className="absolute w-52 h-52 border border-dashed border-brand-500/15 rounded-full" />

          {/* The four icons are one element each, offset 72px to the right of
              the tile center and rotated about that center. A 15s turn with
              3.75s between them spreads them a quarter turn apart. */}
          {[
            { glyph: "✎", label: "Write" },
            { glyph: "🔍", label: "Find" },
            { glyph: "📖", label: "Read" },
            { glyph: "🔐", label: "Keep" },
          ].map((icon, i) => (
            <div
              key={icon.label}
              title={icon.label}
              aria-label={icon.label}
              className="absolute w-8 h-8 flex items-center justify-center rounded-full border border-brand-400 bg-brand-500/20"
              style={{
                top: "50%",
                left: "calc(50% + 72px)",
                transformOrigin: "-72px -16px",
                animation: "orbit 15s linear infinite",
                animationDelay: `${-3.75 * i}s`,
              }}
            >
              <span className="text-sm leading-none">{icon.glyph}</span>
            </div>
          ))}
        </div>
      </article>

      {/* ---- ROW 2, COL 3: OWNERSHIP ---- */}
      <article
        className="rounded-2xl overflow-hidden relative group/own animate-fade-in card-hover"
        style={{
          animationDelay: "0.35s",
          background:
            "linear-gradient(135deg, rgba(13,148,136,0.2) 0%, rgba(13,148,136,0.08) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover/own:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-brand-500/25 via-transparent to-brand-600/15" />
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-400/40 rounded-full blur-2xl opacity-0 group-hover/own:opacity-100 transition-opacity duration-700" />

        <div className="relative h-full flex flex-col justify-between p-6">
          <div>
            <span className="inline-block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-500 mb-3">
              Ownership
            </span>
            <h3 className="text-lg font-[family-name:var(--font-display)] font-semibold leading-tight">
              Yours alone
            </h3>
          </div>

          <div className="space-y-2">
            {[
              { label: "You edit", allowed: true },
              { label: "You delete", allowed: true },
              { label: "They access", allowed: false },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[0.7rem] animate-fade-in"
                style={{
                  animationDelay: `${0.1 * (i + 1)}s`,
                  color: item.allowed ? "rgb(45, 212, 191)" : "rgb(107, 114, 128)",
                }}
              >
                <Lock
                  size={12}
                  className={
                    item.allowed ? "text-brand-400" : "text-brand-900/50"
                  }
                  strokeWidth={2.5}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
