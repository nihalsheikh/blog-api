import { Link, Navigate } from "react-router-dom";
import { ArrowRight, Feather } from "lucide-react";
import Logo from "../components/Logo";
import HeroVisual from "../components/HeroVisual";
import FeatureBento from "../components/FeatureBento";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

/* The manifesto, condensed to the line that carries it. The full argument
   now lives in the bento's lead tile. */
const MANIFESTO = [
  "The internet made publishing free and then kept the cost somewhere else. You can post anything now, and almost nothing is findable six months later.",
  "Narra takes that second half seriously. Write the piece, name it, put it down. It'll be here when you come back — and here when someone else needs it.",
];

const SAMPLE = {
  title: "Notes on a slower internet",
  author: "Ivo Marchetti",
  date: "February 2026",
  readTime: "4 min read",
  words: 612,
  paragraphs: [
    "There was a period, not long ago, when the shape of a page told you what kind of page it was. A link was a link. It went somewhere, and somewhere was a place with an owner.",
    "Now every surface is a slot. The same rectangle hosts a thread, a document, a menu, and an advertisement, and nothing on it promises to still be there tomorrow. We did not lose the ability to publish. We lost the expectation of permanence.",
    "The tools that answer this well are almost all quiet. They do not interrupt to ask what you intend to do next. They hold still while you work, and then they put the finished thing in front of someone.",
  ],
};

export default function Landing() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  // A signed-in visitor never sees the marketing page.
  if (user) return <Navigate to="/my/blogs" replace />;

  return (
    <div className="min-h-screen animate-fade-in">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-30 glass border-b border-[var(--surface-border)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="btn-ghost">
              Log in
            </Link>
            <Link to="/signup" className="btn-primary">
              Start writing
            </Link>
          </div>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <h1 className="font-[family-name:var(--font-display)] text-[2.75rem] leading-[1.04] sm:text-[3.4rem] md:text-[3.9rem] font-semibold tracking-[-0.028em]">
              Every idea deserves
              <br />
              a place to land.
            </h1>

            <p className="text-base sm:text-lg text-soft mt-7 max-w-lg leading-[1.7]">
              Publish in under a minute. Find it again by the name you gave
              it. Read it back in a view built for the long piece.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-9">
              <Link to="/signup" className="btn-primary px-5 py-3 text-base">
                Start writing free
                <ArrowRight size={16} />
              </Link>
              <a href="#reading" className="btn-secondary px-5 py-3 text-base">
                See a real page
              </a>
            </div>

            <p className="text-xs text-muted mt-5">
              Free forever · Takes 30 seconds · No card required
            </p>
          </div>

          <div className="lg:col-span-6">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ---------- Bento ----------
          One grid holds the argument and the four capabilities. The page
          moves from what this is to what it does without a seam. */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-20 md:py-28 scroll-mt-20"
      >
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-300">
            Why Narra
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[2.1rem] md:text-[2.6rem] leading-[1.1] tracking-[-0.02em] font-semibold mt-3">
            Built for the part after the idea
          </h2>
        </div>

        <FeatureBento />

        {/* The argument the bento opens with, restated in full underneath —
            the grid earns it, the prose delivers it. */}
        <div className="prose-narra mt-20 font-[family-name:var(--font-display)] text-[1.0625rem] md:text-[1.125rem] leading-[1.7] max-w-2xl">
          {MANIFESTO.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* ---------- Reading ----------
          The actual reading view, in a frame, at the width it really uses.
          Fraunces, the real measure, a real drop cap. This is the strongest
          claim the product makes, so it should be shown rather than asserted. */}
      <section id="reading" className="border-y divider bg-[var(--surface)] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-300">
              The reading view
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[2.1rem] md:text-[2.6rem] leading-[1.1] tracking-[-0.02em] font-semibold mt-3">
              What it looks like when nobody is talking
            </h2>
            <p className="text-[0.9375rem] text-soft leading-[1.7] mt-4">
              This is the real article view, at the width it really uses. One
              serif, one measure, and a progress hairline so you always know
              how far in you are.
            </p>
          </div>

          {/* Browser chrome, then the page. The frame is what makes it
              read as a screenshot of the product rather than a mockup. */}
          <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--bg-base)] shadow-[var(--shadow-lift)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-11 border-b divider bg-[var(--surface)]">
              <span className="w-2.5 h-2.5 rounded-full bg-ink-200 dark:bg-ink-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink-200 dark:bg-ink-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink-200 dark:bg-ink-700" />
              <span className="ml-3 flex-1 max-w-xs h-6 rounded-md bg-[var(--chip-bg)] flex items-center px-2.5 text-[0.6875rem] text-faint font-[family-name:var(--font-mono)] truncate">
                narra.app/notes-on-a-slower-internet
              </span>
            </div>

            {/* A 3% filled progress hairline — the real component's look. */}
            <div className="h-0.5 w-full bg-[var(--chip-bg)]">
              <div className="h-full w-[3%] bg-gradient-to-r from-brand-400 to-brand-600" />
            </div>

            <div className="px-6 sm:px-10 md:px-14 py-12 md:py-16">
              <article>
                <h3 className="font-[family-name:var(--font-display)] text-[2rem] md:text-[2.6rem] leading-[1.1] tracking-[-0.022em] font-semibold max-w-2xl">
                  {SAMPLE.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 text-sm text-muted">
                  <span className="text-[var(--text-soft)]">{SAMPLE.author}</span>
                  <span aria-hidden="true" className="text-faint">
                    ·
                  </span>
                  <span>{SAMPLE.date}</span>
                  <span aria-hidden="true" className="text-faint">
                    ·
                  </span>
                  <span>{SAMPLE.readTime}</span>
                </div>

                <div className="h-px divider mt-7" />

                <div className="prose-narra mt-7 font-[family-name:var(--font-display)] text-[1.0625rem] leading-[1.75]">
                  {SAMPLE.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t divider flex items-center gap-2 text-sm text-muted">
                  <Feather size={14} className="text-faint" aria-hidden="true" />
                  {SAMPLE.words} words · {SAMPLE.readTime}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ----------
          Inline and left-aligned, not a centred gradient panel. Closing a
          page with a wall of colour is a shout; this is an invitation. */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="border-l-2 border-brand-600 pl-6 sm:pl-8">
          <h2 className="font-[family-name:var(--font-display)] text-[2.1rem] md:text-[2.75rem] leading-[1.08] tracking-[-0.02em] font-semibold max-w-2xl">
            Start with one paragraph.
          </h2>
          <p className="text-base text-soft mt-5 max-w-lg leading-[1.7]">
            You don't need an outline or a plan. You need somewhere to put the
            next sentence — that's the whole setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link to="/signup" className="btn-primary px-5 py-3 text-base">
              Create your account
              <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-secondary px-5 py-3 text-base">
              I already have one
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t divider">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <Logo size="sm" />
            <p className="text-xs text-muted mt-3 max-w-xs leading-relaxed">
              A quiet place to put writing down, and to find it again.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link to="/login" className="text-muted hover:text-[var(--text)] transition">
              Log in
            </Link>
            <Link to="/signup" className="text-muted hover:text-[var(--text)] transition">
              Sign up
            </Link>
            <span className="text-faint text-xs">
              {isDark ? "You prefer the quiet" : "Light, when you need it"}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
