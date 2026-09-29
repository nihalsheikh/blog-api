import { Link } from "react-router-dom";
import { Clock, Pencil, Trash2 } from "lucide-react";
import { formatDate, readingTime, excerpt } from "../utils/date";
import type { BlogCardProps } from "../types/components";

/**
 * A blog summary. `owned` reveals the Edit/Delete controls — the backend
 * enforces ownership server-side (a non-owner gets a 404 on PUT and DELETE),
 * this just avoids offering actions that would fail.
 */
export default function BlogCard({
  blog,
  owned = false,
  onEdit,
  onDelete,
}: BlogCardProps) {
  return (
    <article className="card card-hover p-5 flex flex-col gap-3 group animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <Link
          to={`/blogs/${blog.id}`}
          className="flex-1 min-w-0 group/title"
        >
          <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] leading-snug font-semibold tracking-[-0.01em] group-hover/title:text-brand-700 dark:group-hover/title:text-brand-300 transition">
            {blog.title}
          </h3>
        </Link>

        {owned && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              className="btn-ghost p-2"
              onClick={() => onEdit?.(blog)}
              aria-label={`Edit ${blog.title}`}
              title="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              className="btn-ghost p-2 text-rose-500 hover:bg-rose-500/10 hover:text-rose-400"
              onClick={() => onDelete?.(blog)}
              aria-label={`Delete ${blog.title}`}
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-soft leading-relaxed line-clamp-3">
        {excerpt(blog.content, 200)}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted mt-auto pt-1">
        <time dateTime={blog.created_at}>
          {formatDate(blog.created_at)}
        </time>
        <span className="flex items-center gap-1.5">
          <Clock size={12} aria-hidden="true" />
          {readingTime(blog.content)}
        </span>
      </div>
    </article>
  );
}
