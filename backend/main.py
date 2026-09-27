from fastapi import FastAPI, HTTPException
from routes.health import router as health_router
from routes.blog import router as blog_router
from routes.user import router as user_router
from models import models
from database.db import engine

app = FastAPI()

models.Base.metadata.create_all(bind=engine)


# health api
app.include_router(health_router, prefix="/api")
app.include_router(blog_router, prefix="/api")
app.include_router(user_router, prefix="/api")
