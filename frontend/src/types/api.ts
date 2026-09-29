/**
 * API types.
 *
 * Every shape here mirrors the backend's Pydantic schemas in
 * `backend/schemas/response.py` and `backend/schemas/request.py`.
 * See API_ROUTES.md for the full route reference.
 *
 * Note: `Blog` deliberately has no `user_id` or `author` — the backend's
 * `BlogResponseSchema` never exposes them, so the frontend cannot attribute
 * a blog to its author either.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

/** `GET /api/blogs` and `GET /api/me/blogs` */
export interface AllBlogsResponse {
  message: string;
  total: number;
  page: number;
  limit: number;
  blogs: Blog[];
}

/** `GET /api/blogs/{id}`, `POST /api/blogs`, `PUT /api/blogs/{id}` */
export interface BlogResponse {
  message: string;
  blog: Blog;
}

/** `POST /api/signup`, `GET /api/profile` */
export interface UserProfileResponse {
  message: string;
  user: User;
}

/** `POST /api/login` */
export interface LoginResponse {
  message: string;
  access_token: string;
  token_type: string;
}

/** `DELETE /api/profile`, `DELETE /api/blogs/{id}` */
export interface MessageResponse {
  message: string;
}

/** `GET /api/health` */
export interface HealthResponse {
  status: string;
  message: string;
  db_status: string;
  server_uptime: number;
}

/** Request bodies */
export interface BlogPayload {
  title: string;
  content: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

/**
 * One entry of FastAPI's 422 validation envelope. `loc[0]` is `"body"` or
 * `"query"`, and `loc[1]` is the offending field name.
 */
export interface ValidationError {
  type: string;
  loc: (string | number)[];
  msg: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

/**
 * Field limits enforced by the backend. The UI mirrors these in character
 * counters and client-side checks, but the server is the real authority.
 */
export const LIMITS = {
  name: { min: 1, max: 50 },
  password: { min: 6, max: 20 },
  title: { min: 2, max: 50 },
  content: { min: 10, max: 1500 },
  /** `GET /api/blogs` caps `limit` at 50. */
  pageSize: { min: 1, max: 50 },
} as const;
