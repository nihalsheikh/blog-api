from fastapi.middleware.cors import CORSMiddleware
from config.env_config import settings

origins = settings.origins


def cors_config(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
