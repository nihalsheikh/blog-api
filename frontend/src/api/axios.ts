import axios from "axios";
import type { AxiosError } from "axios";

/**
 * The API base URL includes the `/api` prefix — every route in the backend
 * is mounted under it (see backend/main.py). Override with VITE_API_URL.
 */
export const API_URL: string =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

/** Attach the bearer token to every request if we have one. */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * A 401 means the stored token is gone or expired. Drop the session and send
 * the user to /login — unless they are already on a public page, which would
 * otherwise bounce them around in a redirect loop.
 */
const PUBLIC_PATHS = ["/login", "/signup", "/"];

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname;
      if (!PUBLIC_PATHS.includes(path)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  },
);

/**
 * Normalise every backend failure into a single `detail` string.
 *
 * The backend has two error shapes and they must be distinguished:
 *   - `{"detail": "Email already exists"}`   — HTTPException, 4xx/5xx
 *   - `{"detail": [ {loc, msg}, ... ]}`     — FastAPI 422 validation
 * A naive `data.detail` would stringify the 422 array into "[object Object]",
 * so the list branch is handled explicitly.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  const axiosErr = error as AxiosError<{ detail?: unknown }>;
  const detail = axiosErr?.response?.data?.detail;

  if (typeof detail === "string" && detail) return detail;

  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0] as { loc?: (string | number)[]; msg?: string };
    return first.msg ?? "Please check the details you entered.";
  }

  if (!axiosErr?.response) {
    return "Can't reach the server. Check your connection and try again.";
  }

  return fallback;
}

export default api;
