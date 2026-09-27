from pydantic import BaseModel, ConfigDict
from datetime import datetime


class HealthApiSchema(BaseModel):
    status: str
    message: str
    db_status: str
    server_uptime: int


class BlogResponseData(BaseModel):
    id: str
    title: str
    content: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class BlogResponseSchema(BaseModel):
    message: str
    blog: BlogResponseData


class AllBlogsResponseSchema(BaseModel):
    message: str
    blogs: list[BlogResponseData]


class DeleteBlogResponseSchema(BaseModel):
    message: str
