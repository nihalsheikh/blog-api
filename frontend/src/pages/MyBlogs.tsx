import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PenSquare, Trash2 } from "lucide-react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState, { ErrorBanner } from "../components/EmptyState";
import { deleteBlog, fetchMyBlogs } from "../api/blogs";
import { getErrorMessage } from "../api/axios";
import { excerpt, formatDate } from "../utils/date";
import type { Blog } from "../types/api";

const PER_PAGE = 6;

export default function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchMyBlogs(page, PER_PAGE)
      .then((data) => {
        if (cancelled) return;
        setBlogs(data.blogs);
        setTotal(data.total);
      })
      .catch((err) => {
        if (cancelled) return;
        setBlogs([]);
        setTotal(0);
        setError(getErrorMessage(err, "Couldn't load your stories"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, attempt]);

  async function confirmDelete() {
    if (!pendingDelete || deleting) return;
    setDeleting(true);
    try {
      await deleteBlog(pendingDelete.id);
      setPendingDelete(null);
      setBlogs((prev) => prev.filter((b) => b.id !== pendingDelete.id));
      setTotal((prev) => Math.max(0, prev - 1));
      if (blogs.length === 1 && page > 1) setPage((p) => p - 1);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't delete that story"));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="animate-fade-in">
      <header className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-[2.1rem] leading-tight font-semibold tracking-[-0.018em]">
            My stories
          </h1>
          <p className="text-sm text-soft mt-1.5">
            {loading
              ? "Loading..."
              : total === 0
                ? "Nothing written yet."
                : `${total} ${total === 1 ? "story" : "stories"}, all yours.`}
          </p>
        </div>
        <Link to="/write" className="btn-primary shrink-0">
          <PenSquare size={15} />
          New story
        </Link>
      </header>

      {error && (
        <div className="mb-4">
          <ErrorBanner message={error} onRetry={() => setAttempt((n) => n + 1)} />
        </div>
      )}

      {loading ? (
        <LoadingSpinner label="Loading your stories" />
      ) : blogs.length === 0 && !error ? (
        <EmptyState
          icon={PenSquare}
          headline="Your shelf is empty"
          description="Start with something short. You can always edit it later, and nobody else sees a draft until you publish."
          action={
            <Link to="/write" className="btn-primary">
              <PenSquare size={15} />
              Write a story
            </Link>
          }
        />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            {blogs.map((blog) => (
              <div key={blog.id} className="relative group">
                <BlogCard blog={blog} />
                <button
                  type="button"
                  onClick={() => setPendingDelete(blog)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition"
                  aria-label={`Delete ${blog.title}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
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

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this story?"
        description={
          pendingDelete
            ? `"${excerpt(pendingDelete.title, 60)}" and its ${formatDate(pendingDelete.created_at)} record will be gone for good. This can't be undone.`
            : ""
        }
        confirmLabel="Delete"
        busy={deleting}
        onConfirm={confirmDelete}
        onClose={() => setPendingDelete(null)}
      />
    </div>
  );
}
