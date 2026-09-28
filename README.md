# Blog API

A production-style RESTful Blog API built with **FastAPI**, **PostgreSQL**, **SQLAlchemy**, **JWT authentication**, and **Pydantic**.

The API provides user authentication, blog CRUD operations, ownership-based authorization, pagination, title search, rate limiting, CORS support, and automatic deletion of a user's blogs when their account is deleted.

---

## 🚀 Features

### Authentication & Authorization

- User registration
- User login with OAuth2 password flow
- JWT access tokens
- Protected routes
- Current-user authentication dependency
- Password hashing with bcrypt
- Token expiration
- User-specific authorization for blog updates/deletions

### User Management

- Create a user account
- Retrieve the authenticated user's profile
- Delete the authenticated user's account
- Automatically delete the user's blogs when the user is deleted

### Blog Management

- Create a blog
- Get all blogs
- Get a single blog
- Update your own blogs
- Delete your own blogs
- Retrieve the authenticated user's own blogs
- Search blogs by title
- Pagination
- Newest blogs displayed first

### API Protection

- CORS configuration
- Rate limiting with SlowAPI
- Global exception handling
- Request validation with Pydantic
- Database-level constraints

---

## 🛠️ Tech Stack

| Technology           | Purpose                     |
| -------------------- | --------------------------- |
| **FastAPI**          | Web framework               |
| **Python**           | Backend language            |
| **PostgreSQL**       | Relational database         |
| **SQLAlchemy**       | ORM                         |
| **Pydantic**         | Request/response validation |
| **python-jose**      | JWT handling                |
| **Passlib + bcrypt** | Password hashing            |
| **SlowAPI**          | Rate limiting               |
| **Uvicorn**          | ASGI server                 |
| **Swagger UI**       | API documentation           |

---

## 📁 Project Structure

```text
blog-api/
│
├── backend/
│   │
│   ├── auth/
│   │   ├── auth.py
│   │   ├── password.py
│   │   └── token.py
│   │
│   ├── config/
│   │   └── env_config.py
│   │
│   ├── database/
│   │   └── db.py
│   │
│   ├── middleware/
│   │   ├── cors.py
│   │   ├── exception_handler.py
│   │   └── rate_limit.py
│   │
│   ├── models/
│   │   └── models.py
│   │
│   ├── routes/
│   │   ├── blog.py
│   │   └── user.py
│   │
│   ├── schemas/
│   │   ├── request.py
│   │   └── response.py
│   │
│   ├── utils/
│   │   └── get_db.py
│   │
│   └── main.py
│
├── .env
├── .gitignore
└── README.md
```

## 🔐 Environment Variables

```bash
DATABASE_URL=postgresql+psycopg://username:password@localhost:5432/blog_db

SECRET_KEY=your-super-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7

ORIGINS=["http://localhost:5173"]
```

start server with: make sure you are inside the backend dir

```bash
uvicorn main:app --reload
```

## ⚠️ Error Handling

The project includes global exception handling to prevent unexpected server errors from producing inconsistent responses.

Expected HTTP errors such as:

- 400 Bad Request
- 401 Unauthorized
- 404 Not Found
- 409 Conflict
- 429 Too Many Requests

are handled appropriately by the API.

## 🔒 Security

The API implements several security measures:

- Passwords are never stored as plaintext.
- Passwords are hashed using bcrypt.
- JWT tokens are signed using a secret key.
- JWT expiration is configured through environment variables.
- Protected endpoints require authentication.
- Blog modification requires ownership.
- User IDs are obtained from authenticated users rather than request bodies.
- Rate limiting helps reduce excessive requests.
- CORS restricts browser-based cross-origin access.

## 📄 License

This project is intended as a learning and portfolio project.
