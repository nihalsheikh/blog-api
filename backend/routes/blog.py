from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session

from schemas.request import BlogCreateSchema
from schemas.response import (
    BlogResponseSchema,
    AllBlogsResponseSchema,
    DeleteBlogResponseSchema,
)

from utils.get_db import get_db
from models.models import Blog, User
from auth.auth import get_current_user
from middleware.rate_limit import limiter

router = APIRouter()


# Create Blog
@router.post(
    "/blogs", status_code=status.HTTP_201_CREATED, response_model=BlogResponseSchema
)
@limiter.limit("10/minute")
def create_blog(
    request: Request,
    blog: BlogCreateSchema,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    new_blog = Blog(title=blog.title, content=blog.content, user_id=current_user.id)

    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)

    return {"message": "Blog created successfully", "blog": new_blog}


# Read All blogs
@router.get(
    "/blogs", status_code=status.HTTP_200_OK, response_model=AllBlogsResponseSchema
)
@limiter.limit("50/minute")
def get_blogs(
    request: Request,
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=5, ge=1, le=50),
    search: str = Query(default=""),
    db: Session = Depends(get_db),
):
    # Search
    query = db.query(Blog)
    if search:
        query = query.filter(Blog.title.ilike(f"%{search}%"))

    total = query.count()

    # Pagination Logic
    start = (page - 1) * limit
    blogs = query.order_by(Blog.created_at.desc()).offset(start).limit(limit).all()

    return {
        "message": "Fetched all blogs",
        "total": total,
        "page": page,
        "limit": limit,
        "blogs": blogs,
    }


# Read a single blog
@router.get(
    "/blogs/{blog_id}",
    status_code=status.HTTP_200_OK,
    response_model=BlogResponseSchema,
)
@limiter.limit("50/minute")
def get_blog(request: Request, blog_id: str, db: Session = Depends(get_db)):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()

    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found"
        )

    return {"message": "Fetched the blog details", "blog": blog}


# User's own post
@router.get(
    "/me/blogs", status_code=status.HTTP_200_OK, response_model=AllBlogsResponseSchema
)
@limiter.limit("10/minute")
def get_user_blogs(
    request: Request,
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=5, ge=1, le=50),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    query = db.query(Blog).filter(Blog.user_id == current_user.id)

    total = query.count()

    # Pagination
    start = (page - 1) * limit

    blogs = query.order_by(Blog.created_at.desc()).offset(start).limit(limit).all()

    return {
        "message": "Fetched current user blogs",
        "total": total,
        "page": page,
        "limit": limit,
        "blogs": blogs,
    }


# Update the blog
@router.put(
    "/blogs/{blog_id}",
    status_code=status.HTTP_200_OK,
    response_model=BlogResponseSchema,
)
@limiter.limit("20/minute")
def update_blog(
    request: Request,
    blog_id: str,
    updated_blog: BlogCreateSchema,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    blog = (
        db.query(Blog)
        .filter(Blog.id == blog_id, Blog.user_id == current_user.id)
        .first()
    )

    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found"
        )

    blog.title = updated_blog.title
    blog.content = updated_blog.content

    db.commit()
    db.refresh(blog)

    return {"message": "Blog details updated successfully", "blog": blog}


# Delete Blog
@router.delete(
    "/blogs/{blog_id}",
    status_code=status.HTTP_200_OK,
    response_model=DeleteBlogResponseSchema,
)
@limiter.limit("5/minute")
def delete_blog(
    request: Request,
    blog_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    blog = (
        db.query(Blog)
        .filter(Blog.id == blog_id, Blog.user_id == current_user.id)
        .first()
    )

    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found"
        )

    db.delete(blog)
    db.commit()

    return {"message": "Blog deleted successfully"}
