import { useEffect, useState } from "react";
import { BookOpen, Search, X } from "lucide-react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState, { ErrorBanner } from "../components/EmptyState";
import { fetchBlogs } from "../api/blogs";
import { getErrorMessage } from "../api/axios";
import type { Blog } from "../types/api";

const PER_PAGE = 9;

export default function Explore() {
  const [query, setQuery] = useState("");
  // The applied term — typing updates `query` but not the request, so we
  // aren't hitting the API on every keystroke.
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchBlogs(page, PER_PAGE, search || undefined)
      .then((data) => {
        if (cancelled) return;
        setBlogs(data.blogs);
        setTotal(data.total);
      })
      .catch((err) => {
        if (cancelled) return;
        setBlogs([]);
        setTotal(0);
        setError(getErrorMessage(err, "Couldn't search the library"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, search, attempt]);

  // A new search means a new result set — start it from page one.
  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    setPage(1);
    setSearch(query.trim());
  }

  function clearSearch() {
    setQuery("");
    setSearch("");
    setPage(1);
  }

  return (
    <div className="animate-fade-in">
      <header className="mb-7">
        <h1 className="font-[family-name:var(--font-display)] text-[2.1rem] leading-tight font-semibold tracking-[-0.018em]">
          Explore
        </h1>
        <p className="text-sm text-soft mt-1.5">
          Everything anyone here has written, searchable by title.
        </p>
      </header>

      <form onSubmit={submitSearch} className="mb-6">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title…"
            aria-label="Search stories by title"
            className="input pl-10 pr-24"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-soft transition"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-10 top-1/2 -translate-y-1/2 text-xs font-medium text-brand-700 dark:text-brand-300 hover:underline"
          >
            Search
          </button>
        </div>
      </form>

      {search && !loading && !error && (
        <p className="text-sm text-muted mb-5">
          {total === 0
            ? `No stories matching “${search}”`
            : `${total} ${total === 1 ? "result" : "results"} for “${search}”`}
        </p>
      )}

      {error && (
        <div className="mb-4">
          <ErrorBanner message={error} onRetry={() => setAttempt((n) => n + 1)} />
        </div>
      )}

      {loading ? (
        <LoadingSpinner label="Searching" />
      ) : blogs.length === 0 && !error ? (
        <EmptyState
          icon={search ? Search : BookOpen}
          headline={search ? "Nothing found" : "The library is empty"}
          description={
            search
              ? `No title contains “${search}”. Try a shorter or more common word.`
              : "Once stories are published they'll show up here for everyone to read."
          }
        />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {total > PER_PAGE && (
            <Pagination
              page={page}
              limit={PER_PAGE}
              total={total}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
