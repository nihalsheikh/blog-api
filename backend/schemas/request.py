from pydantic import BaseModel, Field


class BlogCreateSchema(BaseModel):
    title: str = Field(..., min_length=2, max_length=50)
    content: str = Field(..., min_length=10, max_length=1500)
