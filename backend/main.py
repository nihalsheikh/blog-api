from fastapi import FastAPI, HTTPException
from routes.health import router as health_router
from models import models
from database.db import engine

app = FastAPI()

models.Base.metadata.create_all(bind=engine)


# health api
app.include_router(health_router, prefix="/api")
