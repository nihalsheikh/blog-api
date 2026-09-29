import { useEffect } from "react";
import { X } from "lucide-react";
import type { ModalProps } from "../types/components";

/**
 * The shared dialog. Dismissible three ways — backdrop click, the close
 * button, and Escape. Body scroll is locked while open.
 *
 * `role="dialog"` / `aria-modal` / `aria-labelledby` are set, which the
 * design guide flags as missing from the reference implementation.
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-lg",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  // No hidden-in-DOM modals — return null so nothing is focusable offscreen.
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 dark:bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`${maxWidth} w-full max-h-[90vh] glass-strong rounded-2xl animate-slide-up shadow-2xl flex flex-col overflow-hidden`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-3 shrink-0 flex items-center justify-between gap-4">
          <h2 id="modal-title" className="text-lg font-semibold tracking-tight">
            {title}
          </h2>
          <button className="btn-ghost p-2" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="px-6 pb-6 overflow-y-auto flex-1 min-h-0">{children}</div>

        {footer && (
          <div className="px-6 py-4 border-t divider shrink-0 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
