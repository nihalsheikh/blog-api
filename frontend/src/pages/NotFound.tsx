import { Link } from "react-router-dom";
import { ArrowLeft, Compass, Feather } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/15 text-brand-600 dark:text-brand-300 flex items-center justify-center mx-auto mb-6">
          <Feather size={28} strokeWidth={1.5} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300 mb-3">
          Error 404
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[2.6rem] md:text-[3.2rem] leading-[1.08] tracking-[-0.02em] font-semibold">
          This page never got written
        </h1>
        <p className="text-sm text-soft mt-3 max-w-sm mx-auto leading-relaxed">
          The link is broken, or the story it pointed at was deleted. Either
          way, there's a whole library on the other side of this.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link to="/" className="btn-primary">
            <Compass size={15} />
            Go to the feed
          </Link>
          <Link to="/explore" className="btn-secondary">
            <ArrowLeft size={15} />
            Explore stories
          </Link>
        </div>
      </div>
    </div>
  );
}
