import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import LoadingSpinner from "./LoadingSpinner";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  /** States the consequence explicitly — never just "Are you sure?" */
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
  busy?: boolean;
  error?: string;
}

/** A shared confirmation dialog. Destructive actions use the rose button. */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onClose,
  busy = false,
  error,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="max-w-sm"
      footer={
        <>
          <button className="btn-secondary" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm} disabled={busy}>
            {busy ? (
              <>
                <LoadingSpinner size={14} />
                Working...
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="w-11 h-11 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
          <AlertTriangle size={20} strokeWidth={1.5} />
        </div>
        <p className="text-sm text-soft leading-relaxed">{description}</p>
        {error && (
          <div
            role="alert"
            className="text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2"
          >
            {error}
          </div>
        )}
      </div>
    </Modal>
  );
}
