import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Send } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { ErrorBanner } from "../components/EmptyState";
import { createBlog, fetchBlog, updateBlog } from "../api/blogs";
import { getErrorMessage } from "../api/axios";
import { countWords, readingTime } from "../utils/date";
import { LIMITS } from "../types";
import type { BlogFormState } from "../types/pages";

const EMPTY: BlogFormState = { title: "", content: "" };

/**
 * Create and edit share this screen — the backend's PUT is a full replace, so
 * the edit path loads the existing blog first and submits both fields.
 */
export default function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const navigate = useNavigate();
  const [form, setForm] = useState<BlogFormState>(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);

    fetchBlog(id)
      .then(({ blog }) => {
        if (cancelled) return;
        setForm({ title: blog.title, content: blog.content });
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, "Couldn't open that story"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const update = (key: keyof BlogFormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const words = useMemo(() => countWords(form.content), [form.content]);

  // Mirror the server's rules so the user learns about them while typing,
  // rather than from a 422 after a submit.
  const titleError =
    form.title.length > 0 && form.title.trim().length < LIMITS.title.min;
  const contentError =
    form.content.length > 0 &&
    form.content.trim().length < LIMITS.content.min;

  const tooLongTitle = form.title.length > LIMITS.title.max;
  const tooLongContent = form.content.length > LIMITS.content.max;
  const tooLong = tooLongTitle || tooLongContent;

  const valid =
    !tooLong &&
    form.title.trim().length >= LIMITS.title.min &&
    form.content.trim().length >= LIMITS.content.min;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!valid || submitting) return;

    setError(null);
    setSubmitting(true);
    try {
      if (id) {
        await updateBlog(id, form);
        navigate(`/blogs/${id}`, { replace: true });
      } else {
        const { blog } = await createBlog(form);
        navigate(`/blogs/${blog.id}`, { replace: true });
      }
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't save your story"));
      setSubmitting(false);
    }
  }

  if (loading) return <LoadingSpinner full label="Opening your draft" />;

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <Link
        to="/my/blogs"
        className="inline-flex items-center gap-1.5 text-sm text-soft hover:text-[var(--text)] transition mb-6"
      >
        <ArrowLeft size={15} />
        Back to my stories
      </Link>

      <h1 className="font-[family-name:var(--font-display)] text-[2.1rem] leading-tight font-semibold tracking-[-0.018em] mb-1.5">
        {isEdit ? "Edit your story" : "Write a story"}
      </h1>
      <p className="text-sm text-soft mb-7">
        {isEdit
          ? "Saving replaces the whole story, so make every change before you hit publish."
          : "A title and a body. That's the whole deal."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <ErrorBanner message={error} />}

        <div>
          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            autoFocus
            maxLength={LIMITS.title.max + 10}
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="A title that earns the next paragraph"
            className="input text-lg font-medium"
            aria-invalid={titleError || tooLongTitle}
          />
          <p
            className={`text-xs mt-1.5 flex justify-between ${
              titleError || tooLongTitle
                ? "text-rose-500"
                : "text-faint"
            }`}
          >
            <span>
              {titleError
                ? `At least ${LIMITS.title.min} characters.`
                : tooLongTitle
                  ? `Titles stop at ${LIMITS.title.max} characters.`
                  : `Up to ${LIMITS.title.max} characters.`}
            </span>
            <span>
              {form.title.length}/{LIMITS.title.max}
            </span>
          </p>
        </div>

        <div>
          <label htmlFor="content" className="label">
            Story
          </label>
          <textarea
            id="content"
            required
            rows={16}
            maxLength={LIMITS.content.max + 100}
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            placeholder="Start anywhere. You can rearrange it after."
            className="input font-[family-name:var(--font-display)] text-[1.0625rem] leading-[1.7] resize-y min-h-80"
            aria-invalid={contentError || tooLongContent}
          />
          <p
            className={`text-xs mt-1.5 flex justify-between ${
              contentError || tooLongContent
                ? "text-rose-500"
                : "text-faint"
            }`}
          >
            <span>
              {contentError
                ? `At least ${LIMITS.content.min} characters.`
                : tooLongContent
                  ? `Stories stop at ${LIMITS.content.max} characters.`
                  : `${words} ${words === 1 ? "word" : "words"} · ${readingTime(form.content)}`}
            </span>
            <span>
              {form.content.length}/{LIMITS.content.max}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={submitting || tooLong}
            className="btn-primary"
          >
            {submitting ? (
              <>
                <LoadingSpinner size={14} />
                Publishing…
              </>
            ) : (
              <>
                <Send size={15} />
                {isEdit ? "Save changes" : "Publish"}
              </>
            )}
          </button>
          <Link to="/my/blogs" className="btn-ghost">
            Cancel
          </Link>
          <span className="ml-auto text-xs text-faint hidden sm:flex items-center gap-1.5">
            <Save size={12} />
            Nothing is saved until you publish
          </span>
        </div>
      </form>
    </div>
  );
}
