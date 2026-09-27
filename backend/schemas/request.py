from pydantic import BaseModel, Field, EmailStr


class BlogCreateSchema(BaseModel):
    title: str = Field(..., min_length=2, max_length=50)
    content: str = Field(..., min_length=10, max_length=1500)


class UserCreateSchema(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=20)
