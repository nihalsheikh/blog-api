from pydantic import BaseModel, ConfigDict
from datetime import datetime


# Health API
class HealthApiSchema(BaseModel):
    status: str
    message: str
    db_status: str
    server_uptime: int


# Blogs
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
    total: int
    page: int
    limit: int
    blogs: list[BlogResponseData]


class DeleteBlogResponseSchema(BaseModel):
    message: str


# Users
class UserResponseData(BaseModel):
    id: str
    name: str
    email: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserProfileResponseSchema(BaseModel):
    message: str
    user: UserResponseData


class UserLoginResponseSchema(BaseModel):
    message: str
    access_token: str
    token_type: str


class UserDeletedResponseSchema(BaseModel):
    message: str
