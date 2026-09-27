from sqlalchemy import Column, String, Text, DateTime
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
    title = Column(String(60), nullable=False)
    content = Column(Text, nullable=False)

    created_at = Column(
        DateTime, nullable=False, default=lambda: datetime.now(timezone.utc)
    )
    updated_at = Column(
        DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
