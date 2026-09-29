import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

/**
 * Route guard. Waits for the stored session to be read before deciding, so
 * a hard refresh on a protected page doesn't bounce the user to /login.
 *
 * The attempted path travels in router state; Login reads it back and
 * returns the user where they were headed.
 */
export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { user, initialising } = useAuth();
  const location = useLocation();

  if (initialising) return <LoadingSpinner full />;

  if (!user) {
    return (
      <Navigate to="/login" state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
}
