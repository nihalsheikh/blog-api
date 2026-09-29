# Narra

A full-stack blogging platform — a **FastAPI** REST backend with JWT authentication and a **React 19 + TypeScript** frontend. Readers can browse and search published posts without an account; signed-in users can write, edit, and delete their own posts, and manage their account.

| Light Mode                   | Dark Mode                  |
| ---------------------------- | -------------------------- |
| ![light](./assets/light.png) | ![dark](./assets/dark.png) |

---

## 📖 Overview

The repository is split into two independently runnable applications:

|             | Backend                         | Frontend                                   |
| ----------- | ------------------------------- | ------------------------------------------ |
| Path        | `backend/`                      | `frontend/`                                |
| Stack       | FastAPI, SQLAlchemy, PostgreSQL | React 19, TypeScript, Vite, Tailwind CSS 4 |
| Runs on     | `http://localhost:8000`         | `http://localhost:5173`                    |
| Entry point | `main.py`                       | `src/main.tsx`                             |

The frontend is a static SPA — it holds no secrets and talks to the backend exclusively over the documented HTTP API, so either side can be run, changed, or replaced on its own.

---

## 🚀 Features

### Authentication & Authorization

- User registration and login (OAuth2 password flow)
- JWT access tokens with configurable expiration
- Password hashing with bcrypt
- Protected routes resolved from the authenticated token, never from the request body
- Ownership-based authorization — a blog is only modifiable by its author
- Account deletion cascades to remove that user's blogs

### Blog Management

- Create, read, update, and delete blogs
- Public list with pagination and case-insensitive title search
- "My posts" view scoped to the signed-in user
- Newest posts first
- Reading-time and word-count estimates in the UI

### API Protection

- CORS restricted to configured origins
- Per-IP rate limiting via SlowAPI
- Global exception handling
- Request validation via Pydantic

### Interface

- Light and dark themes, with the choice persisted across reloads
- Responsive shell: fixed sidebar on desktop, bottom navigation on mobile
- Loading, empty, and error states handled for every data-driven view
- Public reading routes; writing and account routes behind a route guard

---

## 🛠️ Tech Stack

**Backend**

| Technology           | Purpose                                    |
| -------------------- | ------------------------------------------ |
| **FastAPI**          | Web framework, auto-generated OpenAPI docs |
| **Python**           | Backend language                           |
| **PostgreSQL**       | Relational database                        |
| **SQLAlchemy**       | ORM                                        |
| **Pydantic**         | Request/response validation                |
| **python-jose**      | JWT encoding and decoding                  |
| **Passlib + bcrypt** | Password hashing                           |
| **SlowAPI**          | Rate limiting                              |
| **Uvicorn**          | ASGI server                                |

**Frontend**

| Technology         | Purpose                                  |
| ------------------ | ---------------------------------------- |
| **React 19**       | UI framework                             |
| **TypeScript**     | Static typing                            |
| **Vite**           | Dev server and build tool                |
| **React Router 7** | Client-side routing                      |
| **Tailwind CSS 4** | Utility-first styling (CSS-first config) |
| **Axios**          | HTTP client with auth interceptors       |
| **lucide-react**   | Icon set                                 |

Interactive API documentation is served by FastAPI at `/docs` (Swagger UI) and `/redoc` while the backend is running.

---

## 🚀 Getting Started

### Prerequisites

- Python 3.x
- Node.js 18+
- A running PostgreSQL instance

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
```

Create `backend/.env` (this file is git-ignored and must not be committed):

```bash
DATABASE_URL=postgresql+psycopg://username:password@localhost:5432/blog_db

SECRET_KEY=your-super-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7

ORIGINS=["http://localhost:5173"]
```

Then start the server from inside `backend/` — the app uses top-level imports, so the working directory matters:

```bash
uvicorn main:app --reload
```

Tables are created on startup via `Base.metadata.create_all`. The API is then available at `http://localhost:8000/api`.

### 2. Frontend

```bash
cd frontend
npm install
```

Copy the example env file and point it at the backend:

```bash
cp .env.example .env
```

```bash
VITE_API_URL=http://localhost:8000/api
```

Then start the dev server:

```bash
npm run dev
```

The UI is then available at `http://localhost:5173`.

`ORIGINS` on the backend must include the frontend's origin, or the browser will block every cross-origin request.

---

## 📁 Project Structure

```text
blog-api/
│
├── backend/
│   ├── auth/
│   │   ├── auth.py              # Current-user dependency
│   │   ├── password.py          # bcrypt hash / verify
│   │   └── token.py             # JWT create / verify
│   ├── config/
│   │   └── env_config.py        # Environment settings
│   ├── database/
│   │   └── db.py                # Engine, session factory, Base
│   ├── middleware/
│   │   ├── cors.py              # CORS configuration
│   │   ├── exception_handler.py # Catch-all 500 handler
│   │   └── rate_limit.py        # SlowAPI limiter + 429 handler
│   ├── models/
│   │   └── models.py            # User and Blog tables
│   ├── routes/
│   │   ├── blog.py              # Blog CRUD, list, own posts
│   │   ├── health.py            # Health check
│   │   └── user.py              # Signup, login, profile
│   ├── schemas/
│   │   ├── request.py           # Incoming payload validation
│   │   └── response.py          # Outgoing response models
│   ├── utils/
│   │   ├── get_db.py            # Per-request session dependency
│   │   └── health.py            # Uptime and DB status
│   ├── main.py                  # App assembly
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/                 # Axios instance + typed endpoint helpers
│   │   ├── components/          # Shell, cards, modals, navigation
│   │   ├── context/             # AuthContext, ThemeContext
│   │   ├── pages/               # Landing, Login, Signup, Home,
│   │   │                        # Explore, BlogDetail, BlogEditor,
│   │   │                        # MyBlogs, Profile, NotFound
│   │   ├── types/               # Shared TypeScript interfaces
│   │   ├── utils/               # Date, excerpt, reading-time helpers
│   │   ├── App.tsx              # Route table
│   │   ├── main.tsx             # Provider composition
│   │   └── index.css            # Design tokens and component classes
│   ├── public/
│   ├── .env.example
│   └── package.json
│
├── API_ROUTES.md               # Full HTTP API reference
├── UI_DESIGN_GUIDE.md          # Frontend design system reference
└── README.md
```

---

## 🔐 Environment Variables

**Backend** — read in `backend/config/env_config.py`:

| Variable                   | Purpose                                                        |
| -------------------------- | -------------------------------------------------------------- |
| `DATABASE_URL`             | SQLAlchemy connection string (required; boot fails without it) |
| `SECRET_KEY`               | JWT signing key                                                |
| `ALGORITHM`                | JWT signing algorithm, e.g. `HS256`                            |
| `ACCESS_TOKEN_EXPIRE_DAYS` | Token lifetime in days                                         |
| `ORIGINS`                  | Comma-separated list of allowed CORS origins                   |

**Frontend** — read in `frontend/src/api/axios.ts`:

| Variable       | Purpose                                              |
| -------------- | ---------------------------------------------------- |
| `VITE_API_URL` | Base URL of the backend, including the `/api` prefix |

---

## 🔒 Security

- Passwords are never stored in plaintext; they are hashed with bcrypt.
- JWTs are signed with `SECRET_KEY` and expire after `ACCESS_TOKEN_EXPIRE_DAYS`.
- Protected endpoints reject requests without a valid `Authorization: Bearer <token>` header.
- Blog modification is restricted to the author, enforced in the query itself.
- User identity comes from the verified token, never from a request body.
- Deleting an account removes that user's blogs in the same transaction.
- Rate limiting reduces excessive requests; CORS restricts browser-based cross-origin access.
- `.env` files are git-ignored. Keep secrets out of version control.

---

## 📚 Further Documentation

Two companion documents live at the repository root:

- **`API_ROUTES.md`** — the complete HTTP reference: all 11 endpoints with methods, access level, rate limits, request and response shapes, every error status and its `detail` string, the `User` and `Blog` data models, and a suggested end-to-end call flow. Read this before integrating any client.

- **`UI_DESIGN_GUIDE.md`** — the frontend design system reference: design tokens, the component library, motion and theming conventions, the responsive strategy, accessibility notes, and file-by-file guidance for building new UI. Read this before adding or restyling a component.

---

## 📄 License

This project is intended as a learning and portfolio project.
