from fastapi import APIRouter, Depends, HTTPException, status
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

router = APIRouter()


# Create Blog
@router.post(
    "/blogs", status_code=status.HTTP_201_CREATED, response_model=BlogResponseSchema
)
def create_blog(
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
def get_blogs(db: Session = Depends(get_db)):
    all_blogs = (
        db.query(Blog).order_by(Blog.created_at.desc()).all()
    )  # newest blog on top by desc
    return {"message": "Fetched all blogs", "blogs": all_blogs}


# Read a single blog
@router.get(
    "/blogs/{blog_id}",
    status_code=status.HTTP_200_OK,
    response_model=BlogResponseSchema,
)
def get_blog(blog_id: str, db: Session = Depends(get_db)):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()

    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found"
        )

    return {"message": "Fetched the blog details", "blog": blog}


# Update the blog
@router.put(
    "/blogs/{blog_id}",
    status_code=status.HTTP_200_OK,
    response_model=BlogResponseSchema,
)
def update_blog(
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
def delete_blog(
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
