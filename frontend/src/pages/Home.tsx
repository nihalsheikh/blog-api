import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PenSquare } from "lucide-react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState, { ErrorBanner } from "../components/EmptyState";
import { fetchBlogs } from "../api/blogs";
import { getErrorMessage } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import type { Blog } from "../types/api";

const PER_PAGE = 6;

export default function Home() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // Bumped by the retry button so a refetch can happen without a page change.
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchBlogs(page, PER_PAGE)
      .then((data) => {
        if (cancelled) return;
        setBlogs(data.blogs);
        setTotal(data.total);
      })
      .catch((err) => {
        if (cancelled) return;
        setBlogs([]);
        setTotal(0);
        setError(getErrorMessage(err, "Couldn't load the stories"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, attempt]);

  const firstName = user?.name.split(" ")[0];

  return (
    <div className="animate-fade-in">
      <header className="mb-7">
        <h1 className="font-[family-name:var(--font-display)] text-[2.1rem] leading-tight font-semibold tracking-[-0.018em]">
          {firstName ? `Welcome back, ${firstName}` : "Latest stories"}
        </h1>
        <p className="text-sm text-soft mt-1.5">
          {loading
            ? "Gathering the latest…"
            : total === 0
              ? "Nothing published yet."
              : `${total} ${total === 1 ? "story" : "stories"} published so far.`}
        </p>
      </header>

      {error && (
        <div className="mb-4">
          <ErrorBanner message={error} onRetry={() => setAttempt((n) => n + 1)} />
        </div>
      )}

      {loading ? (
        <LoadingSpinner label="Loading stories" />
      ) : blogs.length === 0 && !error ? (
        <EmptyState
          icon={PenSquare}
          headline="No stories yet"
          description="The first one is always the hardest. Write a paragraph and see how it feels."
          action={
            <Link to="/write" className="btn-primary">
              <PenSquare size={15} />
              Write the first one
            </Link>
          }
        />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-4 w-full">
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
