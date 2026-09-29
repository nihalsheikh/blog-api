import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, FileText, Pencil, Trash2 } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmDialog from "../components/ConfirmDialog";
import ReadingProgressBar from "../components/ReadingProgressBar";
import { ErrorBanner } from "../components/EmptyState";
import { deleteBlog, fetchBlog, fetchMyBlogs } from "../api/blogs";
import { getErrorMessage } from "../api/axios";
import { formatDate, countWords, readingTime } from "../utils/date";
import { useAuth } from "../context/AuthContext";
import type { Blog } from "../types/api";

/**
 * The blog payload carries no author id, so ownership has to be inferred.
 * We page through the signed-in reader's own stories looking for this id and
 * only show the owner controls if it's there. The check is bounded — a
 * reader with more than MAX_OWNER_SCAN stories is treated as "unknown", and
 * the controls stay hidden rather than offering actions the API will reject.
 */
const OWNER_PAGE = 50;
const MAX_OWNER_SCAN = 5;

async function isOwnedByViewer(blogId: string): Promise<boolean> {
  for (let page = 1; page <= MAX_OWNER_SCAN; page += 1) {
    const data = await fetchMyBlogs(page, OWNER_PAGE, undefined);
    if (data.blogs.some((b) => b.id === blogId)) return true;
    if (page * OWNER_PAGE >= data.total) return false;
  }
  return false;
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [owned, setOwned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [attempt, setAttempt] = useState(0);

  // The progress bar measures this element, not the document, so a short
  // post on a long page still fills the bar at the end of the story.
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const blogId = id;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchBlog(id)
      .then(async (data) => {
        if (cancelled) return;
        setBlog(data.blog);

        if (!user) return;
        // Ownership is a nicety, not a gate — never let it hold up the read.
        try {
          const mine = await isOwnedByViewer(blogId);
          if (!cancelled) setOwned(mine);
        } catch {
          // Leave the controls hidden; the read is unaffected.
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setBlog(null);
        setError(getErrorMessage(err, "Couldn't open that story"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, attempt, user]);

  async function handleDelete() {
    if (!blog || deleting) return;
    setDeleting(true);
    try {
      await deleteBlog(blog.id);
      navigate("/my/blogs", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't delete that story"));
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (loading) return <LoadingSpinner full label="Loading story" />;

  if (error || !blog) {
    return (
      <div className="animate-fade-in max-w-md mx-auto mt-10">
        <ErrorBanner
          message={error ?? "This story doesn't exist."}
          onRetry={() => setAttempt((n) => n + 1)}
        />
        <Link to="/home" className="btn-secondary w-full mt-4">
          <ArrowLeft size={15} />
          Back to the feed
        </Link>
      </div>
    );
  }

  return (
    <article className="animate-fade-in">
      <ReadingProgressBar targetRef={bodyRef} />

      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          to="/home"
          className="inline-flex items-center gap-1.5 text-sm text-soft hover:text-[var(--text)] transition"
        >
          <ArrowLeft size={15} />
          Back
        </Link>

        {owned && (
          <div className="flex items-center gap-2">
            <Link
              to={`/write/${blog.id}`}
              className="btn-secondary px-3"
              aria-label="Edit this story"
              title="Edit this story"
            >
              <Pencil size={15} />
              <span className="hidden sm:inline">Edit</span>
            </Link>
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="btn-ghost px-3 text-rose-500 hover:bg-rose-500/10 hover:text-rose-400"
              aria-label="Delete this story"
              title="Delete this story"
            >
              <Trash2 size={15} />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        )}
      </div>

      <header className="mb-9">
        <h1 className="font-[family-name:var(--font-display)] text-[2.4rem] md:text-[3.1rem] leading-[1.1] tracking-[-0.022em] font-semibold">
          {blog.title}
        </h1>
        <div className="flex items-center gap-4 mt-4 text-sm text-muted">
          <time dateTime={blog.created_at}>
            {formatDate(blog.created_at)}
          </time>
          <span className="flex items-center gap-1.5">
            <Clock size={13} aria-hidden="true" />
            {readingTime(blog.content)}
          </span>
        </div>
        <div className="h-px divider mt-7" />
      </header>

      <div
        ref={bodyRef}
        className="prose-narra font-[family-name:var(--font-display)] text-[1.0625rem] leading-[1.75]"
      >
        {blog.content.split(/\n\s*\n/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <footer className="mt-12 pt-8 border-t divider flex items-center gap-2 text-sm text-muted">
        <FileText size={15} className="text-faint" />
        {countWords(blog.content)} words · {readingTime(blog.content)}
      </footer>

      <ConfirmDialog
        open={confirming}
        title="Delete this story?"
        description={`“${blog.title}” will be gone for good, for you and for everyone reading it. This can't be undone.`}
        confirmLabel="Delete"
        busy={deleting}
        onConfirm={handleDelete}
        onClose={() => setConfirming(false)}
      />
    </article>
  );
}
