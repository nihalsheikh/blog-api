from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database.db import Base
import uuid
from datetime import datetime, timezone


# Blog Table
class Blog(Base):
    __tablename__ = "blogs"

    id = Column(
        String,
        primary_key=True,
        unique=True,
        index=True,
        nullable=False,
        default=lambda: str(uuid.uuid4()),
    )
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)

    user_id = Column(String, ForeignKey("users.id"), nullable=False)

    author = relationship("User", back_populates="blogs")

    created_at = Column(
        DateTime, nullable=False, default=lambda: datetime.now(timezone.utc)
    )
    updated_at = Column(
        DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )


# User Table
class User(Base):
    __tablename__ = "users"

    id = Column(
        String,
        primary_key=True,
        unique=True,
        index=True,
        nullable=False,
        default=lambda: str(uuid.uuid4()),
    )
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    created_at = Column(
        DateTime, nullable=False, default=lambda: datetime.now(timezone.utc)
    )

    updated_at = Column(
        DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    blogs = relationship("Blog", back_populates="author", cascade="all, delete-orphan")
