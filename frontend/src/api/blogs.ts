import api from "./axios";
import type {
  AllBlogsResponse,
  BlogPayload,
  BlogResponse,
  MessageResponse,
} from "../types/api";

/** `GET /api/blogs` — public, paginated, searchable by title. */
export async function fetchBlogs(
  page: number,
  limit: number,
  search?: string,
  signal?: AbortSignal,
): Promise<AllBlogsResponse> {
  const { data } = await api.get<AllBlogsResponse>("/blogs", {
    params: { page, limit, ...(search ? { search } : {}) },
    signal,
  });
  return data;
}

/** `GET /api/blogs/{id}` — public. */
export async function fetchBlog(
  blogId: string,
  signal?: AbortSignal,
): Promise<BlogResponse> {
  const { data } = await api.get<BlogResponse>(`/blogs/${blogId}`, { signal });
  return data;
}

/** `GET /api/me/blogs` — the signed-in user's own posts. */
export async function fetchMyBlogs(
  page: number,
  limit: number,
  signal?: AbortSignal,
): Promise<AllBlogsResponse> {
  const { data } = await api.get<AllBlogsResponse>("/me/blogs", {
    params: { page, limit },
    signal,
  });
  return data;
}

/** `POST /api/blogs` — the owner comes from the token, not the body. */
export async function createBlog(payload: BlogPayload): Promise<BlogResponse> {
  const { data } = await api.post<BlogResponse>("/blogs", payload);
  return data;
}

/** `PUT /api/blogs/{id}` — a full replace; both fields are required. */
export async function updateBlog(
  blogId: string,
  payload: BlogPayload,
): Promise<BlogResponse> {
  const { data } = await api.put<BlogResponse>(`/blogs/${blogId}`, payload);
  return data;
}

/** `DELETE /api/blogs/{id}` — returns 200 with a message, not 204. */
export async function deleteBlog(blogId: string): Promise<MessageResponse> {
  const { data } = await api.delete<MessageResponse>(`/blogs/${blogId}`);
  return data;
}
