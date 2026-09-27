from dotenv import load_dotenv
import os

load_dotenv()

if os.getenv("DATABASE_URL") is None:
    raise RuntimeError(
        status_code=400, detail="ERROR: DATABASE_URL not set in Environment Variables"
    )


class Settings:
    db_url = os.getenv("DATABASE_URL")
    secret_key = os.getenv("SECRET_KEY")
    algorithm = os.getenv("ALGORITHM")
    access_token_expire_days = int(os.getenv("ACCESS_TOKEN_EXPIRE_DAYS"))
    origins = os.getenv("ORIGINS")


settings = Settings()
