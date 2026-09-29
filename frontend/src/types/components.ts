import type { ComponentType, ReactNode, RefObject } from "react";
import type { Blog } from "./api";

// Modal
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
}

// Theme toggle
export interface ThemeToggleProps {
  /** Adds a text label beside the icon — used in the desktop sidebar. */
  withLabel?: boolean;
}

// Navigation
export interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
}

// Blog card
export interface BlogCardProps {
  blog: Blog;
  /** Enables the Edit/Delete controls; only true on the owner's own blogs. */
  owned?: boolean;
  onEdit?: (blog: Blog) => void;
  onDelete?: (blog: Blog) => void;
}

// Pagination
export interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

// Logo
export interface LogoProps {
  size?: "sm" | "md";
  withText?: boolean;
}

// Loading spinner
export interface LoadingSpinnerProps {
  size?: number;
  /** `true` renders a centred, full-screen loader instead of a bare one. */
  full?: boolean;
  /** Screen-reader text, and a visible caption when not `full`. */
  label?: string;
  className?: string;
}

// Reader
export interface ReadingProgressBarProps {
  targetRef: RefObject<HTMLElement | null>;
}
