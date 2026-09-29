import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "../types/components";

/**
 * Page controls. `total` is the count of matching rows, not the page count,
 * so the last page is derived with a ceiling — and guarded against a
 * zero-row result collapsing to page 0.
 */
export default function Pagination({
  page,
  limit,
  total,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-between gap-3 pt-2"
      aria-label="Pagination"
    >
      <p className="text-xs text-muted">
        Page <span className="font-semibold text-soft">{page}</span> of{" "}
        <span className="font-semibold text-soft">{totalPages}</span>
        {" · "}
        {total} {total === 1 ? "story" : "stories"}
      </p>

      <div className="flex items-center gap-2">
        <button
          className="btn-secondary px-3"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </button>
        <button
          className="btn-secondary px-3"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}
