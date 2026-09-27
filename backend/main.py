from fastapi import FastAPI, HTTPException
from routes.health import router as health_router
from routes.blog import router as blog_router
from routes.user import router as user_router
from models import models
from database.db import engine
from middleware.cors import cors_config
from middleware.rate_limit import setup_rate_limit
from middleware.exception_handler import global_exception_handler

app = FastAPI()

# Global exception handler
app.add_exception_handler(Exception, global_exception_handler)

# CORS config
cors_config(app)

# Rate Limiter
setup_rate_limit(app)

models.Base.metadata.create_all(bind=engine)


# health api
app.include_router(health_router, prefix="/api")
app.include_router(blog_router, prefix="/api")
app.include_router(user_router, prefix="/api")
